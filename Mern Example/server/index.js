const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const redis = new Redis(); // Connect to default Redis instance

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model("Product", ProductSchema);

// Middleware to check cache before querying MongoDB
const cacheMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const cachedData = await redis.get(`product:${id}`);

  if (cachedData) {
    console.log("Serving from Redis Cache");
    return res.json(JSON.parse(cachedData));
  }

  next();
};

// Route to get a product (with caching)
app.get("/product/:id", cacheMiddleware, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ error: "Product not found" });

  await redis.set(`product:${id}`, JSON.stringify(product), "EX", 60); // Cache for 60 sec
  res.json(product);
});

// Route to add a product
app.post("/product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

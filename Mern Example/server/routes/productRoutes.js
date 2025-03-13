import express from "express";
import Product from "../models/Product.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";
import redisClient from "../config/redis.js";

const router = express.Router();

// Fetch Product by ID
router.get("/:id", cacheMiddleware, async (req, res) => {
// router.get("/:id", async (req, res) => {
  console.log("fetching product By ID");
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await redisClient.setEx(
    `product:${req.params.id}`,
    3600,
    JSON.stringify(product)
  );
  res.json(product);
});

// Get all products
router.get("/", async (req, res) => {
  console.log("fetching all products");
  const products = await Product.find();
  res.json(products);
});

// Add new product
router.post("/", async (req, res) => {
  console.log("saving product");
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// module.exports = router;
export default router;

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import redisClient from "./config/redis.js";

dotenv.config();
connectDB();


const app = express();
// app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173", // ✅ Set your frontend URL explicitly
  credentials: true, // ✅ Allow sending cookies with requests
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));

// const express = require("express");
// const connectDB = require("./config/db");
// const redis = require("./config/redis");
// const cors = require("cors");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/product", productRoutes);
// app.use("/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const Product = require("../models/Product");
// const cacheMiddleware = require("../middleware/cacheMiddleware");
// const redis = require("../config/redis");

// const router = express.Router();

// Get product with Redis caching
// router.get("/:id", cacheMiddleware, async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) return res.status(404).json({ error: "Product not found" });

//   await redis.set(
//     `product:${req.params.id}`,
//     JSON.stringify(product),
//     "EX",
//     60
//   );
//   res.json(product);
// });

import express from "express";
import Product from "../models/Product.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";

const router = express.Router();

router.get("/:id", cacheMiddleware, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await redisClient.setEx(
    `product:${req.params.id}`,
    3600,
    JSON.stringify(product)
  );
  res.json(product);
});

export default router;

// Add new product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;

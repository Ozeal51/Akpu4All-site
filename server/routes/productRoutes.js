const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.json(saved);
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
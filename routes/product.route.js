const express = require("express");
const Product = require("../model/product.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/", (req, res) => {
  const { name, price } = req.body;

  const product = { id: 1, name, price };
  res.status(200).json({ success: true, product });
});

module.exports = router;

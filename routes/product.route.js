const express = require("express");
const Product = require("../model/product.model");
const router = express.Router();
const { getAllProducts } = require("../controllers/products.controller");
router.get("/", getAllProducts);

// router.post("/", (req, res) => {
//   const { name, price } = req.body;

//   const product = { id: 1, name, price };
//   res.status(200).json({ success: true, product });
// });

module.exports = router;

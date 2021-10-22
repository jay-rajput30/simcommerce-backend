const express = require("express");
const router = express.Router();
// const Cart = require("../model/cart.model");

const {
  getAllCarts,
  getCart,
  addToCart,
  deleteFromCart,
} = require("../controllers/cart.controller");

router.get("/", getAllCarts);

router.get("/:id", getCart);

router.post("/:id", addToCart);

router.delete("/:id", deleteFromCart);

module.exports = router;

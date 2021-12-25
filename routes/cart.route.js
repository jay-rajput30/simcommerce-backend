const express = require("express");
const router = express.Router();
const authenticateRoute = require("../utils/routeAuth");

const {
  getAllCarts,
  getCart,
  addToCart,
  deleteFromCart,
} = require("../controllers/cart.controller");

router.get("/", getAllCarts);

router.get("/:id", getCart);

router.post("/", authenticateRoute, addToCart);

router.post("/remove", authenticateRoute, deleteFromCart);

module.exports = router;

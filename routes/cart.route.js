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

router.post("/:id", authenticateRoute, addToCart);

router.post(
  "/remove/:id",
  // () => console.log("delete cart route"),
  deleteFromCart
);

module.exports = router;

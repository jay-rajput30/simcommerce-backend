const express = require("express");
// const Wishlist = require("../model/wishlist.model");
const router = express.Router();
const authenticateRoute = require("../utils/routeAuth");

const {
  getAllWishlists,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

router.get("/", getAllWishlists);

router.get("/singlewishlist", authenticateRoute, getWishlist);

router.post("/", authenticateRoute, addToWishlist);

router.post("/removeitem", authenticateRoute, removeFromWishlist);
// router.delete("/:id", removeFromWishlist);

module.exports = router;

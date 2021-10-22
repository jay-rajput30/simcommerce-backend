const express = require("express");
// const Wishlist = require("../model/wishlist.model");
const router = express.Router();
// const mongoose = require("mongoose");

const {
  getAllWishlists,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

router.get("/", getAllWishlists);

router.get("/:id", getWishlist);

router.post("/:id", addToWishlist);

router.delete("/:id", removeFromWishlist);

module.exports = router;

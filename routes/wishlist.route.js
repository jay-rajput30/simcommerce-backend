const express = require("express");
const Wishlist = require("../model/wishlist.model");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const wistlists = await Wishlist.find({});

    res.status(200).json({ success: true, wistlists });
  } catch (e) {
    res.status(503).json({ success: false, e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const wishlistItem = await Wishlist.findOne({ uid: `${userId}` });
    res.status(200).json({ success: true, wishlistItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const { productId } = req.body;
    const id = mongoose.mongo.ObjectId(productId);
    const newWishListItem = await Wishlist.findById(`${wishlistId}`);
    const productPresent = newWishListItem.products.findIndex(
      (item) => id == item
    );
    console.log(typeof newWishListItem.products[0].toString(), productPresent);
    // if (productPresent >= 0) {
    //   console.log({ productPresent }, "product present");
    //   res.status(200).json({ success: true, newWishListItem });
    // } else {
    //   console.log({ newWishListItem, productPresent }, "product not present");
    newWishListItem.products.push(productId);
    await newWishListItem.save();
    res.status(200).json({ success: true, newWishListItem });
    // }
    res.status(200).json({ success: true, newWishListItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const { removeProductId } = req.body;
    const wishlistItem = await Wishlist.findById(`${wishlistId}`);
    const index = wishlistItem.products.findIndex(
      (productId) => productId === removeProductId
    );
    wishlistItem.products.splice(index, 1);
    await wishlistItem.save();
    console.log(wishlistItem);

    // const updatedWishlist = await Wishlist.findById({});
    res.status(200).json({ success: true, wishlistItem });
    // const updatedWishlistItems = wishlistItem.products.filter((item) => {
    //   return item.toString() !== removeProductId;
    //   updatedWishlistItems.save();
    //   console.log(item);
    // });

    // wishlistItem = {
    //   ...wishlistItem,
    //   products: [...wishlistItem.products, updatedWishlistItems],
    // };
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

module.exports = router;

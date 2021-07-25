const express = require("express");
const Wishlist = require("../model/wishlist.model");
const router = express.Router();

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
    const wishlistId = req.params.id;
    const wishlistItem = await Wishlist.findOne({ uid: `${wishlistId}` });
    res.status(200).json({ success: true, wishlistItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const { productId } = req.body;
    const newWishListItem = await Wishlist.findOne(`${wishlistId}`);
    // console.log(newWishListItem);
    newWishListItem.products.push(productId);
    await newWishListItem.save();
    res.status(200).json({ success: true, newWishListItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

module.exports = router;

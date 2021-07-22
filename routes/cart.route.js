const express = require("express");
const router = express.Router();
const Cart = require("../model/cart.model");

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find({});

    res.status(200).json({ success: true, carts });
  } catch (e) {
    res.status(503).json({ success: false, e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const cartItem = await Cart.findById(`${cartId}`);
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const { productId } = req.body;
    const newCartItem = await Wishlist.findById(`${cartId}`);
    // console.log(newCartItem);
    newCartItem.products.push(productId);
    await newCartItem.save();
    res.status(200).json({ success: true, newWishListItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

module.exports = router;

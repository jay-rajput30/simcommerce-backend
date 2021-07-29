const express = require("express");
const router = express.Router();
const Cart = require("../model/cart.model");

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find({});

    res.status(200).json({ success: true, carts });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const cartItem = await Cart.findOne({ uid: `${userId}` });
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const { productId } = req.body;
    const cartItem = await Cart.findById(`${cartId}`);
    cartItem.products.push(productId);
    cartItem.quantity = cartItem.products.length;
    await cartItem.save();
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

module.exports = router;

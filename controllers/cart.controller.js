const User = require("../model/user.model");
const Wishlist = require("../model/wishlist.model");
const Cart = require("../model/cart.model");

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});

    res.status(200).json({ success: true, carts });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const cartItem = await Cart.findOne({ uid: `${userId}` });
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const addToCart = async (req, res) => {
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
};

const deleteFromCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { removeProductId } = req.body;
    const cartItem = await Cart.findById(`${cartId}`);
    const index = cartItem.products.findIndex(
      (productId) => productId === removeProductId
    );
    cartItem.products.splice(index, 1);
    cartItem.quantity = cartItem.products.length;
    await cartItem.save();
    console.log(cartItem);
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(503).json({ succes: false, err });
  }
};

module.exports = { getAllCarts, getCart, addToCart, deleteFromCart };

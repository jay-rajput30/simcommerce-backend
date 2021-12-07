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
    const cartItem = await Cart.findOne({ uid: `${userId}` }).populate(
      "cartProducts.productId"
    );
    console.log({ cartItem });
    // let populatedCart = cartItem.cartProducts.forEach((item) =>
    //   item.execPopulate("productId")
    // );
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    console.log({ err });
    res.json({ success: false, err });
  }
};

const addToCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { productId } = req.body;
    const cart = await Cart.findById(`${cartId}`).populate(
      "cartProducts.productId"
    );
    const cartItem = await cart.cartProducts.find(
      (item) => item.productId._id.toString() == productId.toString()
    );
    if (cartItem) {
      cart.cartProducts.forEach((item) => {
        if (item.productId._id.toString() == productId.toString()) {
          item.quantity = item.quantity + 1;
        }
      });
    } else {
      cart.cartProducts.push({ productId, quantity: 1 });
      // cartItem.quantity = cartItem.products.length;
    }

    await cart.save();

    res.status(200).json({ success: true, cartItem: cart });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    console.log("inside remove cart controller");
    const cartId = req.params.id;
    const { removeProductId } = req.body;
    const cartItem = await Cart.findById(`${cartId}`);
    const index = cartItem.products.findIndex(
      (productId) => productId.toString() == removeProductId.toString()
    );
    cartItem.products.splice(index, 1);
    cartItem.quantity = cartItem.products.length;
    await cartItem.save();
    console.log({ cartItem, index });
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(503).json({ succes: false, err });
  }
};

module.exports = { getAllCarts, getCart, addToCart, deleteFromCart };

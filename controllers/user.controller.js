const User = require("../model/user.model");
const Wishlist = require("../model/wishlist.model");
const Cart = require("../model/cart.model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const getUser = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ uid: `${req.userFound._id}` });
    const wishlistItem = await Wishlist.findOne({
      uid: `${req.userFound._id}`,
    });
    res.status(200).json({
      success: true,
      userId: req.userFound._id,
      cartItem,
      wishlistItem,
      token: req.token,
    });
    // const { username, password }req}.body;
    // const user = await User.findOne({ name: username.toString() });
    // console.log({ user });
    // if (user && user.name === username && user.password === password) {
    // const cartItem = await Cart.findOne({ uid: `${user._id}` });
    // const wishlistItem = await Wishlist.findOne({ uid: `${user._id}` });
    //   res
    //     .status(200)
    //     .json({ success: true, userId: user._id, cartItem, wishlistItem });
    // } else {
    //   res.status(404).json({ success: false, error: "user not found" });
    // }
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let newPassword = hash;
        const user = new User({ name, email, password: newPassword });

        // { name, email, password: newPassword }
        await user.save();
        console.log({ newPassword, user });
        let createWishlist = { uid: user._id, products: [] };
        let createCart = { uid: user._id, cartProducts: [] };

        const newWishlist = new Wishlist(createWishlist);
        await newWishlist.save();

        const newCart = new Cart(createCart);
        await newCart.save();

        res.status(200).json({ success: true, user });
      });
    });
  } catch (e) {
    res.status(503).json({ success: false, e });
  }
};

const getUserCollection = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);
    const cartItem = await Cart.findOne({ uid: `${userId}` });
    const wishlistItem = await Wishlist.findOne({ uid: `${userId}` });
    res.status(200).json({
      success: true,
      cartId: cartItem._id,
      wishlistId: wishlistItem._id,
    });
  } catch (err) {
    res.status(504).json({ success: false, err });
  }
};

module.exports = { getAllUsers, getUser, addUser, getUserCollection };

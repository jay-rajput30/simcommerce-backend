const User = require("../model/user.model");
const Wishlist = require("../model/wishlist.model");
const Cart = require("../model/cart.model");

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
    // const userId = req.params.id;
    console.log("inside get user controller method");
    const { username, password } = req.body;
    const user = await User.findOne({ name: username.toString() });
    // console.log({ user });
    if (user && user.name === username && user.password === password) {
      const cartItem = await Cart.findOne({ uid: `${user._id}` });
      const wishlistItem = await Wishlist.findOne({ uid: `${user._id}` });
      console.log(true);
      res
        .status(200)
        .json({ success: true, userId: user._id, cartItem, wishlistItem });
    } else {
      res.status(404).json({ success: false, error: "user not found" });
    }
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const newUser = await user.save({ name, email, password });
    // console.log(newUser._id);

    let createWishlist = { uid: newUser._id, products: [] };
    let createCart = { uid: newUser._id, cartProducts: [] };

    const newWishlist = new Wishlist(createWishlist);
    await newWishlist.save();

    const newCart = new Cart(createCart);
    await newCart.save();

    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(503).json({ success: false, e });
  }
};

// const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const deletedUser = new User();
//   } catch (err) {
//     res.status(503).json({ success: false, err });
//   }
// };

module.exports = { getAllUsers, getUser, addUser };

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
    const userId = req.params.id;
    const user = await User.findById(`${userId}`);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: "user does note exists" });
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
    console.log(newUser._id);

    let createWishlist = { uid: newUser._id, products: [] };
    let createCart = { uid: newUser._id, products: [], quantity: 0 };

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

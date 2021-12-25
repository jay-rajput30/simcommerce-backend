const User = require("../model/user.model");
const Wishlist = require("../model/wishlist.model");
const Cart = require("../model/cart.model");

const getAllWishlists = async (req, res) => {
  try {
    const wistlists = await Wishlist.find({});

    res.status(200).json({ success: true, wistlists });
  } catch (e) {
    res.status(503).json({ success: false, e });
  }
};
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.data;
    const wishlistItem = await Wishlist.findOne({ uid: `${userId}` });

    res.status(200).json({ success: true, wishlistItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.data;
    const { productId } = req.body;
    // console.log({ addtoWishlist: "inside add to wishlist" });
    // console.log({ productId, userId, token: req.token });
    const userwishlist = await Wishlist.findOne({ uid: `${userId}` });
    // token: req.token, userId,
    // console.log({ productId, userwishlist });
    let isProductPresent = userwishlist.products.find(
      (temp) => temp.toString() === productId.toString()
    );

    if (isProductPresent) {
      const index = userwishlist.products.findIndex(
        (removeProductId) => productId.toString() === removeProductId.toString()
      );
      // console.log({ index });
      // userwishlist.products.splice(index, 1);
      // await userwishlist.save();

      // res.status(200).json({ success: true, wishlistItem: userwishlist });
    } else {
      userwishlist.products.push(productId);
      await userwishlist.save();
    }
    res.status(200).json({ success: true, newWishListItem: userwishlist });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

const removeFromWishlist = async (req, res) => {
  // console.log({ data: req.data });
  try {
    const { userId } = req.data;
    const { removeProductId } = req.body;
    console.log({ removeProductId });
    const wishlistItem = await Wishlist.findOne({ uid: `${userId}` });
    console.log({ wishlistItem });
    const index = wishlistItem.products.findIndex(
      (productId) => productId.toString() == removeProductId.toString()
    );
    console.log({ index });
    // wishlistItem.products = wishlistItem.products.filter(
    //   (id) => id.toString() != removeProductId.toString()
    // );
    // wishlistItem.products = updatedWishlistProducts;
    wishlistItem.products.splice(index, 1);
    await wishlistItem.save();

    res.status(200).json({ success: true, wishlistItem });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};
module.exports = {
  getAllWishlists,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

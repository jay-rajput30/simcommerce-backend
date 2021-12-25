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
    console.log({ token: req.token, userId, productId });
    const userwishlist = await Wishlist.findOne(`${userId}`);
    let isProductPresent = userwishlist.products.find(
      (temp) => temp.toString() === productId.toString()
    );

    if (isProductPresent) {
      const index = userwishlist.products.findIndex(
        (removeProductId) => productId.toString() === removeProductId.toString()
      );
      // console.log({ index });
      userwishlist.products.splice(index, 1);
      await userwishlist.save();

      res.status(200).json({ success: true, wishlistItem: userwishlist });
    } else {
      userwishlist.products.push(productId);
      await userwishlist.save();
      res.status(200).json({ success: true, newWishListItem: userwishlist });
    }
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

// const removeFromWishlist = async (req, res) => {
//   try {
//     const wishlistId = req.params.id;
//     //TODO: check on front end how api call is made to remove product, is removeProductId passed in req. body?
//     const { removeProductId } = req.body;
//     const wishlistItem = await Wishlist.findById(`${wishlistId}`);
//     const index = wishlistItem.products.findIndex(
//       (productId) => productId === removeProductId
//     );
//     wishlistItem.products.splice(index, 1);
//     await wishlistItem.save();

//     res.status(200).json({ success: true, wishlistItem });
//   } catch (err) {
//     res.status(503).json({ success: false, err });
//   }
// };
module.exports = {
  getAllWishlists,
  getWishlist,
  addToWishlist,
  // removeFromWishlist,
};

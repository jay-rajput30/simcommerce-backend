const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishListSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Wishlist = mongoose.model("wishlist", wishListSchema);

module.exports = Wishlist;

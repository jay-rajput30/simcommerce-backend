const mongoose = require("mongoose");
const { Product } = require("./product.model");
const { Schema } = mongoose;

const cartSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cartProducts: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;

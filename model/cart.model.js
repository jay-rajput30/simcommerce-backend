const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
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
  quantity: {
    type: Number,
  },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;

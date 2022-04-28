const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
  },
  price: {
    type: Number,
    required: "price is required",
  },
  imageUrl: {
    type: String,
    required: "image url is required",
  },
  description: {
    type: String,
    required: "description is required",
  },
  rating: {
    type: Number,
    required: "rating is required",
  },
  category: {
    type: String,
    required: "name is required",
  },
  offers: [String],
  outOfStock: {
    type: Boolean,
    required: "out of stock option is required",
  },
  isWishtlisted: {
    type: Boolean,
    required: "isWishlisted option is required",
  },
  fastDelivery: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;

const Product = require("../model/product.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products);
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
};

module.exports = { getAllProducts };

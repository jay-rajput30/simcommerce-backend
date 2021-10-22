const express = require("express");
const app = express();
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect");
const product = require("./routes/product.route");
const user = require("./routes/user.route");
const cart = require("./routes/cart.route");
const wishlist = require("./routes/wishlist.route");
app.use(cors());
app.use(express.json());

initializeDBConnection();

app.use("/product", product);
app.use("/user", user);
app.use("/wishlist", wishlist);
app.use("/cart", cart);
app.get("/", (req, res) => {
  res.send("oops, you hit the wrong api.  this is the default route");
});

app.listen(3001, () => {
  console.log("server started");
});

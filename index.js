const express = require("express");
const app = express();
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect");
const product = require("./routes/product.route");
const user = require("./routes/user.route");
const cart = require("./routes/cart.route");
const wishlist = require("./routes/wishlist.route");
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

initializeDBConnection();

app.use("/product", product);
app.use("/user", user);
app.use("/wishlist", wishlist);
app.use("/cart", cart);

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.get("/", (req, res) => {
  res.status(404).send({
    message: "404 api not found.  oops, you hit the wrong api.  please check",
  });
});

app.listen(process.env.PORT || port, () => {
  console.log("server started");
});

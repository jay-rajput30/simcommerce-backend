const express = require("express");
const app = express();
const cors = require("cors");
const product = require("./routes/product.route");
const user = require("./routes/user.route");
const { initializeDBConnection } = require("./db/db.connect");
const wishlist = require("./routes/wishlist.route");
app.use(cors());
app.use(express.json());

initializeDBConnection();

app.use("/product", product);
app.use("/user", user);
app.use("/wishlist", wishlist);

app.get("/", (req, res) => {
  res.send("welcome the simcommerce default route");
});

app.listen(3001, () => {
  console.log("server started");
});

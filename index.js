const express = require("express");
const app = express();
// const cors = require("cors");
const product = require("./routes/product.route");
const { initializeDBConnection } = require("./db/db.connect");

// app.use(cors);
app.use(express.json());
initializeDBConnection();
app.use("/product", product);

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.listen(3000, () => {
  console.log("server started");
});

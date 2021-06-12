const mongoose = require("mongoose");
// require("dotenv").config();
function initializeDBConnection() {
  mongoose
    .connect(
      "mongodb+srv://neogjayrajput:neoGjayrajput30@neog-cluster.8gcnp.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to database"))
    .catch((error) => console.log("Connection failed...", error));
}
module.exports = { initializeDBConnection };

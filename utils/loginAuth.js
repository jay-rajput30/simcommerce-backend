const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const loginVerify = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ name: username.toString() });
    bcrypt.compare(password, userFound.password, (err, result) => {
      if (result) {
        const userDetails = { name: userFound.name, email: userFound.email };
        const token = jwt.sign(userDetails, process.env.MY_SECRET_KEY, {
          expiresIn: "24h",
        });

        userFound.password = undefined;
        req.userFound = userFound;
        req.token = token;
        // console.log(token);
        next();
      } else {
        res.status(401).json({ success: false, err });
      }
    });
  } catch (err) {
    res.status(401).json({ success: false, err: err });
  }
};

module.exports = loginVerify;

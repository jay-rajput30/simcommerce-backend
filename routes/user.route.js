const express = require("express");
const app = express();
const router = express.Router();

const User = require("../model/user.model");

router.get("/", (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (e) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/", (req, res) => {
  const { name, emailId, password } = req.params;
  const user = new User({ name: name, emailId: emailId, password: password });

  const addUser = await user.save();
});

router.get("/:userId", (req, res) => {
  try {
    const userId = req.params;
    const user = await User.findById(`${userId}`);
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(503).json({ success: false, err });
  }
});

module.exports = router;

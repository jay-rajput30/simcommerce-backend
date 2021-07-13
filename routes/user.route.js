const express = require("express");
const app = express();
const router = express.Router();

const User = require("../model/user.model");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (e) {
    res.status(503).json({ success: false, err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(`${userId}`);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: "user does note exists" });
    }
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const newUser = await user.save({ name, email, password });
    console.log(name, email, password);

    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(503).json({ success: false, err });
  }   
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = new User()
    
  } catch (err) {
    res.status(503).json({ success: false, err });
  }
});
module.exports = router;

const express = require("express");
const app = express();
const router = express.Router();

router.route("/:userId", (req, res) => {
  try {
    const user = User;
  } catch (e) {
    res.status(503).json({ success: false, err });
  }
});

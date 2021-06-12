const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "test" });
});

router.post("/", (req, res) => {
  const { name, price } = req.body;

  const product = { id: 1, name, price };
  res.status(200).json({ success: true, product });
});

module.exports = router;

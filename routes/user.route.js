const express = require("express");
const app = express();
const router = express.Router();
const loginVerify = require("../utils/loginAuth");
const authenticateRoute = require("../utils/routeAuth");

// const User = require("../model/user.model");
// const Wishlist = require("../model/wishlist.model");
// const Cart = require("../model/cart.model");
const {
  getAllUsers,
  getUser,
  addUser,
  getUserCollection,
} = require("../controllers/user.controller.js");

router.post("/validate", loginVerify, getUser);

router.get("/usercollection/", authenticateRoute, getUserCollection);

router.get("/", getAllUsers);

router.post("/", addUser);

// router.delete("/:id", deleteUser);

module.exports = router;

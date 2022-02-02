const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { addItemToCart } = require("../../controllers/cart/cart.controller");
const router = express.Router();

router.post(
  "/user/cart/addToCart",
  requireSignin,
  adminMiddleware,
  addItemToCart
);

module.exports = router;

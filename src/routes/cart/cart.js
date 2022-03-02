const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { addItemToCart, getCartItem, getCartItems } = require("../../controllers/cart/cart.controller");
const router = express.Router();

router.post(
  "/user/cart/addToCart",
  requireSignin,
  adminMiddleware,
  addItemToCart
);
router.get(
  "/user/cart/getCart",
  requireSignin,
  adminMiddleware,
  getCartItems
);
router.get(
  "/user/cart/getCartItem/:id",
  requireSignin,
  adminMiddleware,
  getCartItems
);

module.exports = router;

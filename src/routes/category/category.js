const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  addCategory,
  getCategories,
} = require("../../controllers/category/category.controller");
const Category = require("../../models/Category");

const router = express.Router();
router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getCategories", getCategories);
module.exports = router;

const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  addCategory,
  getCategories,
  getCategory
} = require("../../controllers/category/category.controller");
const Category = require("../../models/Category");

const router = express.Router();
router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getCategories", getCategories);
router.get("/category/getCategory/:categoryID", getCategory);

module.exports = router;

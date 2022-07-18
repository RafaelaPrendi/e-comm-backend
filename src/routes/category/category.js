const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
  getCategoriesPaginate,
} = require("../../controllers/category/category.controller");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(path.dirname(__dirname)), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();
router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.put(
  "/category/edit",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  editCategory
);
router.delete(
  "/category/delete/:categoryID",
  requireSignin,
  adminMiddleware,
  deleteCategory
);
router.get("/category/getCategories", getCategories);
router.get("/category/getCategory/:categoryID", getCategory);

module.exports = router;

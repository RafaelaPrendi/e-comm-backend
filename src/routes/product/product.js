const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  addProduct,
  getProducts,
  getProduct,
} = require("../../controllers/product/product");
const router = express.Router();
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

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  addProduct
);
router.get("/product/getProducts", getProducts);
router.get("/product/getProduct/:productID", getProduct);

module.exports = router;

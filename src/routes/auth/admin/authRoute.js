const express = require("express");
const router = express.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../../../validators/auth.validator");
const { requireSignin } = require('../../../common-middleware/index');
const {
  signup,
  signin,
  signout
} = require("../../../controllers/auth/admin/auth.controller");

router.post("/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/signout", requireSignin, signout);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../../validators/auth.validator");

const { signup, signin } = require("../../controllers/auth/auth.controller");
const requireSignin = require("../../common-middleware");

router.post("/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/signup", validateSignUpRequest, isRequestValidated, signup);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;

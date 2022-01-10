const express = require("express");
const router = express.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../../../validators/auth.validator");

const {
  signup,
  signin,
  requireSignin,
} = require("../../../controllers/auth/admin/auth.controller");

router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;

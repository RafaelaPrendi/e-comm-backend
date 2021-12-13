const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  requireSignin,
} = require("../../controllers/auth/auth.controller");

router.post("/signin", signin);
router.post("/signup", signup);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;

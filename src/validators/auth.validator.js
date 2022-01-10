const { check, validationResult } = require("express-validator");

exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
exports.validateSignInRequest = [
  check("email").isEmail().withMessage("valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(400).json({ error: errors });
  next();
};

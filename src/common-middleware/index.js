const jwt = require("jsonwebtoken");
const {
  USER,
  ADMIN,
  UNAUTHORIZED,
  USER_DENIED,
  ADMIN_DENIED,
} = require("../constants");

exports.requireSignin = (req, res, next) => {
  if (req.cookies.token) {
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      //if token expired proceed with logout
      if (error.name === "TokenExpiredError") next();
      else return res.status(400).json({ message: error });
    }
  } else return res.status(400).json({ message: UNAUTHORIZED });
  next();
};
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== USER)
    return res.status(400).json({ message: USER_DENIED });
  next();
};
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== ADMIN)
    return res.status(400).json({ message: ADMIN_DENIED });
  next();
};

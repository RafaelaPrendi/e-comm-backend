const User = require("../../../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  if(Object.keys(req.body).length === 0) {
    return res.status(404).json({
    message: "No Data sent!",
  });}
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered!",
      });
  });
 
  const { firstName, lastName, username, email, password } = req.body;
  
  const _user = new User({
    firstName,
    lastName,
    username: Math.random().toString(),
    email,
    password,
    role: "admin",
  });
  _user.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }
    if (data) {
      return res.status(201).json({
        user: data,
      });
    }
  });
};
exports.signin = (req, res) => {
  if(Object.keys(req.body).length === 0) return res.status(404).json({
    message: "No Data sent!",
  });
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (!user) {
      return res.status(400).json({
        message: "Admin is not registered!",
      });
    } else {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        //return token to manage user session
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { _id, firstName, lastName, email, role, fullname } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullname,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password!",
        });
      }
    }
  });
};

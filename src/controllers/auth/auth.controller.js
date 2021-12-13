const express = require("express");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered!",
      });
  });
  const { firstName, lastName, username, email, password } = req.body;
  const _user = new User({
    firstName,
    lastName,
    username: Math.random().toString(),
    email,
    password,
    role: "user",
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
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (!user) {
      return res.status(400).json({
        message: "User is not registered!",
      });
    } else {
      if (user.authenticate(req.body.password) && user.role === "user") {
        //return token to manage user session
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
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
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  console.log(token, "TOKEN");
  next();
};

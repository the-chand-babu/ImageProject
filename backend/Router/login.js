const express = require("express");
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const Login_Router = express.Router();

Login_Router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const isUser = await UserModel.findOne({ email });

  if (!isUser) {
    return res
      .status(404)
      .json({ message: "User not found Please Provide Valid Email" });
  }

  if (isUser.password !== password) {
    return res.status(403).json({ message: "password not Match" });
  }

  if (isUser) {
    var token = jwt.sign({ userId: isUser._id }, "shhhhh");
    const user = {};
    user.token = token;
    user.name = isUser.name;
    return res.status(200).json({ message: "Login Succesfully" , user });
  }
});

module.exports = Login_Router;

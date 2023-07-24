const express = require("express");
const UserModel = require("../model/UserModel");

const Signup_Router = express.Router();

Signup_Router.post("/", async (req, res) => {
  try{

    const { email, name, password } = req.body;
    console.log("acces", req.body)
    const user = await UserModel.findOne({ email });
  
    if (user) {
      return res.status(403).json({ message: "User is Already Present" });
    }
  
    const isUser = await UserModel({ email, password, name });
  
    await isUser.save();
    res
      .status(201)
      .json({ success: true, message: "User signed up successfully!" });

  }catch(error){
    console.log('error', error)
  }
 
});

module.exports = Signup_Router;

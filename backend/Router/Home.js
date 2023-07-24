const express = require("express");
const ProductModel = require("../model/productModel");
const userAuth = require("../auth/userAuth");

const Home_Router = express.Router();

Home_Router.get("/:page", userAuth, async (req, res) => {
  const { page } = req.params;
  const data = await ProductModel.find()
    .skip((page - 1) * 10)
    .limit(10);
  if (data.length == 0) {
    return res.status(404).json({ message: "no data Present" });
  }

  return res.status(200).json({ message: "Get all the data", data });
});

// Home_Router.post("/", async (req, res) => {
//   const payload = req.body;
//   console.log("this is payload", payload);
//   const isProduct = await ProductModel(payload);
//   await isProduct.save();
//   res.send("done");
// });

module.exports = Home_Router;

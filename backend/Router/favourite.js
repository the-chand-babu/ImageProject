const express = require("express");
const userAuth = require("../auth/userAuth");
const favouriteModel = require("../model/favouriteModel");
const ProductModel = require("../model/productModel");

const favourite_Router = express.Router();

favourite_Router.post("/:id", userAuth, async (req, res) => {
  const _id = req.params.id;
  const isProduct = await ProductModel.findOne({ _id });

  if (!isProduct) {
    return res.status(400).json({ message: "Product are not available" });
  }
  const { author, id, width, height, url, download_url } = isProduct;
  const isFavourite = await favouriteModel({
    author,
    id,
    width,
    height,
    url,
    download_url,
  });
  console.log(isFavourite, "this is is favou");
  await isFavourite.save();
  return res.status(201).json({ message: "succesFUlly added in favourite" });
});

favourite_Router.get("/:page", userAuth, async (req, res) => {
  const { page } = req.params;
  const data = await favouriteModel
    .find()
    .skip((page - 1) * 10)
    .limit(10);

  if (data.length == 0) {
    return res.status(404).json({ message: "no data Present" });
  }
  return res.status(200).json({ message: "here all the data", data });
});

favourite_Router.delete("/:_id", userAuth, async (req, res) => {
  const { _id } = req.params;
  const isData = await favouriteModel.findOneAndDelete({ _id });
  if (!isData) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({ message: "succesFully deleted" });
});

module.exports = favourite_Router;

const mongoose = require("mongoose");

ProductSchema = mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  url: { type: String, required: true },
  download_url: { type: String, required: true },
});

const ProductModel = mongoose.model("product", ProductSchema);


module.exports = ProductModel
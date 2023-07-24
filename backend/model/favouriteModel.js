const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  url: { type: String, required: true },
  download_url: { type: String, required: true },
});

const FavouriteModel = mongoose.model("Favourite", favouriteSchema);

module.exports = FavouriteModel;

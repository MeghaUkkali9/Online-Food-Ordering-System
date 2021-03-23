const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishItemModel = new Schema({
  Dishname: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: false },
  ImageUrl: { type: String, required: true }
});

module.exports = mongoose.model("DishItemModel", DishItemModel);

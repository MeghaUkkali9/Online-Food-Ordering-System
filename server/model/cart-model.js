const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartModel = new Schema({
  Dishname: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: false },
  email: { type: String, required: false },
  Quantity: {type:Number, required: true, default: 1},
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("CartModel", CartModel);
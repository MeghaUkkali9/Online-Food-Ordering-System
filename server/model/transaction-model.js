const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionModel = new Schema({
  Quantity: {type:Number, required: false},
  timestamp: {type: Date, required:true, default: Date.now()},
  Category: { type: String, required: false },
  Dishname: { type: String, required: false },
  Price: { type: Number, required: false },
  email: { type: String, required: false },
  rating: { type:Number, required: false}
});


module.exports = mongoose.model("TransactionModel", TransactionModel);
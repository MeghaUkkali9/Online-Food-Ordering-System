const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInfo = new Schema({
  Fname: { type: String, required: true },
  Lname: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("UserInfo", UserInfo);

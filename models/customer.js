const mongoose = require("mongoose");

let customerSchema= new mongoose.Schema({
  email: String,
  timestamp: Number
});

//mapping
mongoose.model("customer", customerSchema);
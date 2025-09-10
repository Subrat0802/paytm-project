const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Debit", "Credit"],
    required: true
  },
  from:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  amount:{
    type:Number,
    required:true
  },
  message:{
    type:String,
  },
  time: {
    type: Date,
    default: Date.now,
    required:true
  }
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  yourTransaction: [transactionSchema]
});

const user = mongoose.model("User", userSchema);

module.exports = user;

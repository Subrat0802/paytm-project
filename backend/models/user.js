const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
    }
})




const user = mongoose.model("User", userSchema);


module.exports = user;
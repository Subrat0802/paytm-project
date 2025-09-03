const { default: mongoose } = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const account = mongoose.model("Account", accountSchema);
module.exports = account
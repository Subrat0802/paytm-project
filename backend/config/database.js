const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbconnect = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB CONNETED SUCCESSFULLY");
    }catch(error){
        console.log("error", error);
        process.exit(1);
    }
}

module.exports = dbconnect;
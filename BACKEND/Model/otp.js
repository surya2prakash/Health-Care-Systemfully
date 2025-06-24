const mongoose = require("mongoose");



const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
   createdAt: {
      type:Date,
      default:Date.now,
      required:true,
        expires:60*3
    }
});


module.exports = mongoose.model("OTP",otpSchema);
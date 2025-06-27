const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

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

otpSchema.post("save",async(doc)=>{
    try{
    let transporter = nodemailer.createTransport({
                 host:process.env.MAIL_HOST,
                 auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS
                 }
    });

    //SEND THE MAIL 

    let info = transporter.sendMail({
        from:"Heath_Care",
        to:doc.email,
        subject:"Rest Password",
        html:`<b>Your Otp<b><br><h2>${doc.otp}</h2>`
    })
}catch(err){
    console.error(err);
}
    
})


module.exports = mongoose.model("OTP",otpSchema);
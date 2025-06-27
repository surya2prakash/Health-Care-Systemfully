//requirement for user Model ->

//mongoose ka instance le ke aao ->

const mongoose = require("mongoose");

//Schema create kro

const nodemailer = require("nodemailer");

require("dotenv").config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        maxLength:150
    },
    role:{
        type:String,
        enum:["Patient","Doctor","Admin"],
        required:true,
        default:"Patient"

    },
      
    createdAt:{
        type:Date,
        default: Date.now,
       
    },
    updatedAt:{
        type:Date,
        default: Date.now
        
    }

})

userSchema.post("save",async(doc)=>{
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
        subject:"Your SignUp",
        html:`<b><h1> Welcome to Heath-Care</h1><br>
               <p>Thanks for SignUp</p><b>`
    })
}catch(err){
    console.error(err);
}
    
})

module.exports = mongoose.model("User",userSchema);
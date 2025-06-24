//requirement for user Model ->

//mongoose ka instance le ke aao ->

const mongoose = require("mongoose");

//Schema create kro


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
        lowerCase:true
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



module.exports = mongoose.model("User",userSchema);
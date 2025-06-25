//patient Schema ------------>



const mongoose = require("mongoose");



const patientSchema = new mongoose.Schema({
    //login user ki Id hai 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },

    gender:{
        type:String,
        enum:["Male","Female","others"],
        required:true,

    },
    phoneNumber:{
        type:Number,
        required:true,
        
    },
    age:{
        type:Number,
        required:true
    },
    adharNumber:{
        type:Number,
        required:true,
        unique:true
    },
    appointment_book:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment"
    }],
    prescription_recipt:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prescription"
    }],

    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }
   
});


module.exports = mongoose.model("Patient",patientSchema);

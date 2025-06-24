//patient Schema ------------>



const mongoose = require("mongoose");



const patientSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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
    appointment_book:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment"
    }],
    prescription_recipt:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prescription"
    }]
});


module.exports = mongoose.model("Patient",patientSchema);

//prescription model


//import mongoose 

const mongoose = require("mongoose");



const prescriptionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
        required:true
    },
    medicines:{
        type:[String],
        required:true
    },
    date_issue:{
        type:Date,
        default:Date.now
    },
   notes:{
    type:String,
    required:true
   }

});


module.exports = mongoose.model("Prescription",prescriptionSchema);
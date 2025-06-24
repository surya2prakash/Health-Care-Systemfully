// instance mongoose -->

const  mongoose  = require("mongoose");


const appointmentSchema  = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    AppointmentDate:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
       default: Date.now
    },
    updatedAt:{
        type:Date,
        default:date.now
    }
})
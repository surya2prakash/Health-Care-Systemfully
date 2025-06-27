// instance mongoose -->

const  mongoose  = require("mongoose");


const appointmentSchema  = new mongoose.Schema({
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
    // specializedDoctorId:{
    //      type:mongoose.Schema.Types.ObjectId,
    //      ref:"User",
    //      required:true
    // },
    AppointmentDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["Booked","Completed"],
        default:"Booked"
    },
    createdAt:{
        type:Date,
       default: Date.now,
       required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model("Appointment",appointmentSchema);
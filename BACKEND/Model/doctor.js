// mongoose instence ---->

const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    
    //doctor ki User wali Id hai ----->
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true  
    },
    specialization:{
        type:String,
        enum:["General Physician","Cardiologist","Neurologist","Dermatologist","Pediatrician","Gynecologist","Orthopedic","Dentist","Psychiatrist","ENT Specialist"],
        required:true
    },
   
        
    
    available:{
        days:{
            type:[String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

        required:true
        },
            start:{
                type:String,
                required:true
            },
         end:{
            type:String,
            required:true
        }
       },
    
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
    
});


module.exports = mongoose.model("Doctor",doctorSchema);
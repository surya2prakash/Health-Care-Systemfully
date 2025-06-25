//import mongoose instense ---->

const mongoose = require("mongoose");



const bookseatSchema = new mongoose.Schema({
    wards:[{
        ward_type:{
        type:String,
        enum:["General","ICU","Emergency"],
        required:true,
    },
    totalSeat:{
        type:Number,
        required:true
    },
    
    booked_seat:{
        type:Number,
        required:true
    },
    available_seat:{
        type:Number,
        default: function(){
            return this.totalSeat-this.booked_seat
        },
        required:true
    },
}],
status:{
    type:String,
    enum:["Not Discharged","Discharged"],
    
  },
    
    
})


module.exports = mongoose.model("Admit",bookseatSchema);
//import mongoose instense ---->

const mongoose = require("mongoose");



const bookseatSchema = new mongoose.Schema({
    wards:[{
        ward_type:{
        type:String,
        enum:["General","ICU","Emergency"],
        requried:true,
    },
    totalSeat:{
        type:Number,
        requried:true
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
    
    
})


module.exports = mongoose.model("Admit",bookseatSchema);
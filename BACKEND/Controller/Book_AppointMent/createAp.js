
//appointment Patient create kre ga ------>

const User = require("../../Model/user");

const Doctor =require("../../Model/doctor");

const Appointment = require("../../Model/appointment");


exports.book_Appointment_one = async(req,res)=>{
    try{
        
        const userId = req.user.id;

        //kisko dikhana hai

        const {specialization} = req.body;

        //esse me doctors ko filter kr lunga

        const availableDoctors = await Doctor.find({specialization});

               if(!availableDoctors){
                return res.status(404).json({
                    success:false,
                    message:"No doctor Available Currently.."
                })
               }


          //doctor show kro
          
          return  res.status(200).json({
            success:true,
            message:"The available doctor are :",
            doctors:availableDoctors
          })

        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error While Creating The Appointment"
        })
    }
}


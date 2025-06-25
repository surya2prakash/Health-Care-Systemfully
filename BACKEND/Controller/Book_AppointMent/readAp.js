


const Appointment = require("../../Model/appointment");

exports.getYourAppointment = async(req,res)=>{
    try{

        const userId = req.user.id;

        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User Id not found."
            })
        };
          
        //check kro Appointment hai yaa nhi --->

        const checkappointment = await Appointment.find({userId});

        if(!checkappointment || checkappointment.length===0){
            return res.status(404).json({
                success:false,
                message:"No Appointment found."
            })
        };

        //ager hai to show kro

        return res.status(200).json({
            success:true,
            message:"Your Appointment:",
            details:checkappointment
        })


    }catch(err){
          console.error(err);
          return res.status(500).json({
            success:false,
            message:"Problem while seeing the appointment"
          })
    }
}

const Appointment = require("../../Model/appointment");


exports.doctorAppointments = async(req,res)=>{
    try{

        const id = req.user.id;

        if(!id) {
            return res.status(404).json({
                success:false,
                message:"Doctor Id not Found"
            })
        };

        //ager mil gya hai to check kro ki kitne Appointments hain -------------------->

        const checkappointment = await Appointment.find({doctorId:id});

         if(!checkappointment || checkappointment.length===0){
            return res.status(404).json({
                success:false,
                message:"No Appointment found."
            })
        };

         return res.status(200).json({
            success:true,
            message:"Your Appointment:",
            details:checkappointment
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal problem While Geting Doctor Appointments"
        })
    }
}
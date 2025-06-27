//update kya krna chahte ho ?
//book ko status complete kr dunga .........


const Appointment = require("../../Model/appointment");
const Doctor = require("../../Model/doctor");

exports.updatePatientAppointment= async(req,res)=>{
     try{
       
        //doctor dekh sakta hai --------->
        const id = req.user.id;

        //patient ki id chahiye;

        const appointmentId = req.params.id;

        if(!appointmentId){
            return res.status(404).json({
                success:false,
                message:"Patient Appointment id Not found."
            })
        }
      

        //ek bar check kr lo appint ment hai bhi yaa nhi

        const findAppointment = await Appointment.findById(appointmentId);

        if(!findAppointment){
            return res.status(404).json({
                success:false,
                message:"Appointment Not found."
            })
        }

        if(!id){
            return res.status(404).json({
                success:false,
                message:"User Id not found."
            })
        };
          
        //check kro Appointment hai yaa nhi --->

        const finddoctor = await Doctor.findOne({doctorId:id});

        if(!finddoctor){
            return res.status(500).json({
                success:false,
                message:"Doctor Not Found."
            })
        };



           
        //yhan se mujhe doctor ki Id mil gai
           
        let checkMyAppointments = finddoctor._id;



        //yhan doctor Id jo hai vo doctor ki _Id hai --------------------------> 

        const checkappointment = await Appointment.findOneAndUpdate({_id:appointmentId,doctorId:checkMyAppointments},{status:"Complete"},{new:true});

        if(!checkappointment  ){
            return res.status(404).json({
                success:false,
                message:"No Appointment found."
            })
        };

        //ager hai to show kro

        return res.status(200).json({
            success:true,
            message:"Appointment Updated.",
            details:checkappointment
        })


    }catch(err){
          console.error(err);
          return res.status(500).json({
            success:false,
            message:"Problem while updateing the appointment"
          })
    }
}
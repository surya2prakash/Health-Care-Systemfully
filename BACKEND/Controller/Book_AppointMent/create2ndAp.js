

const Doctor = require("../../Model/doctor");

const User = require("../../Model/user");

const Appointment = require("../../Model/appointment")

exports.book_Appointment_two = async(req,res)=>{
    try{
              //doctor id user select the doctor
        const id = req.params.id;
            const{date,status} = req.body;
        const userId = req.user.id;
        

        //check kro id 

        if(!id){
            return res.status(404).json({
                success:false,
                message:"Not Getting Id form Params.."
            })
        };

        //id mil gai to ------->

        const checktheDoctor = await User.findById(id);

        //check kro avalible hai ki nhi doctor

        if(!checktheDoctor || checktheDoctor.role !=="Doctor"){
            return res.status(409).json({
                success:false,
                message:"Doctor Not Found ."
            })
        };


        //check kro kya pta pahle se book kiya hoo us date pe  --->
         const checkappointment = await User.findOne({doctorId,
            userId,
            date
         })
        
        if(checkappointment){
            return res.status(400).json({
                success:false,
                message:"You have already booked On this day."
            })
        }

        //ager mil gya to appointment book kr do

        const appointment = new Appointment({
                userId,
                doctorId:id,
                date,
                status
        });



        await appointment.save();

        return res.status(200).json({
            success:true,
            message:"Appointment Booked Successfully..",
            yourAppointment:appointment
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem While creating the Final Appointment."
        })

    }
}
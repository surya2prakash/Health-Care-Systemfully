


const Appointment = require("../../Model/appointment");
const Doctor = require("../../Model/doctor");

exports.getYourAppointment = async(req,res)=>{
    try{
       
        //doctor dekh sakta hai --------->
        const id = req.user.id;

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

        const checkappointment = await Appointment.find({doctorId:checkMyAppointments}).populate("userId").exec();;

        if(!checkappointment || checkappointment.length===0 ){
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
};


// exports.getSingleAppointment= async(req,res)=>{
//      try{
       
//         //doctor dekh sakta hai --------->
//         const id = req.user.id;

//         //patient ki id chahiye;

//         const appointmentId = req.params.id;

//         if(!appointmentId){
//             return res.status(404).json({
//                 success:false,
//                 message:"Patient Appointment id Not found."
//             })
//         }

//         //ek bar check kr lo appint ment hai bhi yaa nhi

//         const findAppointment = await Appointment.findById(appointmentId);

//         if(!findAppointment){
//             return res.status(404).json({
//                 success:false,
//                 message:"Appointment Not found."
//             })
//         }

//         if(!id){
//             return res.status(404).json({
//                 success:false,
//                 message:"User Id not found."
//             })
//         };
          
//         //check kro Appointment hai yaa nhi --->

//         const finddoctor = await Doctor.findOne({doctorId:id});

//         if(!finddoctor){
//             return res.status(500).json({
//                 success:false,
//                 message:"Doctor Not Found."
//             })
//         };



           
//         //yhan se mujhe doctor ki Id mil gai
           
//         let checkMyAppointments = finddoctor._id;



//         //yhan doctor Id jo hai vo doctor ki _Id hai --------------------------> 

//         const checkappointment = await Appointment.findOne({_id:appointmentId,doctorId:checkMyAppointments}).populate("userId").exec();

//         if(!checkappointment  ){
//             return res.status(404).json({
//                 success:false,
//                 message:"No Appointment found."
//             })
//         };

//         //ager hai to show kro

//         return res.status(200).json({
//             success:true,
//             message:"Your Appointment:",
//             details:checkappointment
//         })


//     }catch(err){
//           console.error(err);
//           return res.status(500).json({
//             success:false,
//             message:"Problem while seeing the appointment"
//           })
//     }
// };


//user apna appointment dekh sake------>

exports.userAppointment = async(req,res)=>{
    try{

        //user id
        const id = req.user.id;

        if(!id){
            return res.status(404).json({
                success:false,
                message:"user Id not found"
            })
        };

        //ager mil gai hai to --->

        let appointmentExist = await Appointment.findOne({userId:id}).populate("userId","name").populate({
            path:'doctorId',
            populate:{
                path:"doctorId",
                Model:"User"
            }
        }).exec();

        if(!appointmentExist){
            return res.status(404).json({
                success:false,
                message:"No Appointment Found ."
            })
        };

        return res.status(200).json({
            success:true,
            message:"Your Appointment ",
            Your_Appointment: appointmentExist
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error while User Appointment read."
        })
    }
}
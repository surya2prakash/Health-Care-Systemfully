const Prescription = require("../../Model/prescription");
const Appointment = require("../../Model/appointment");
const User = require("../../Model/user");



exports.createPrescription  = async(req,res)=>{
    try{

        //doctor  Authorized hai

          const id = req.user.id;

          const appointmentId = req.params.id;

          const {medicines,notes} = req.body;

          if(!id){
            return res.status(404).json({
                success:false,
                message:"Doctor Id Not found."
            })
          };

          if(!appointmentId){
            return res.status(404).json({
                success:false,
                message:"Appointment Id not found."
            })
          };

          //check kro ki appointment id ka user same hai?
            const appointment = await Appointment.findOne({_id:appointmentId,doctorId:id});
            if(!appointment){
                return res.status(404).json({
                    success:false,
                    message:"Appointment Not found."

                })
            }

          const checkUser = await User.findOne({_id:appointment.userId});

          if(!checkUser){
            return res.status(400).json({
                success:false,
                message:"User Not match."
            })
          };

          //ager sab sahi hai to prescription create kro -->

          const prescriptions = await Prescription.create({
                                                                 doctorId:id,
                                                                 userId:appointment.userId,
                                                                 medicines,
                                                                 notes
                                                               });

           if(!prescriptions){
            return res.status(500).json({
                success:false,
                message:"facing Problem While Creating Prescription."
            })
           };
           
           return res.status(200).json({
            success:true,
            message:"Successfully created.",
            prescription:prescriptions
           })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Problem While creating Presciption"
        })
    }
}
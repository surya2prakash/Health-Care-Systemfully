
const Doctor = require("../../Model/doctor");

const User = require("../../Model/user");

exports.createDoctor= async(req,res)=>{
    try{

        //admin hi doctor add kre ga ---->

          const userId = req.user.id;
          

          const {email,specialization, available} = req.body;

          //input me mail aaya hai ya nhi check kro
          

          if(!email || !specialization || !available){
            return res.status(404).json({
                success:false,
                message:" Please fill All the Input .."
            })
          };

          //check kro pahle se hai ya nhi 

          const user = await User.findOne({email});

          if(!user){
            return res.status(404).json({
                success:false,
                message:"Doctor email not found.."
            })
          };

          //ager mil gya to 

         const   doctorId = user._id;

          const createDoctor = await Doctor.create({adminId:userId,
                                                        specialization,
                                                    available,
                                                doctorId});

           
              if(!createDoctor){
                return res.status(409).json({
                    success:false,
                    message:"Unable To createDoctor profile."
                })
              }  ;
              
              return res.status(201).json({
                success:true,
                message:"Doctor profile Created successfully.."
              })



    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem while Create the Doctor profile."
        })
    }
}
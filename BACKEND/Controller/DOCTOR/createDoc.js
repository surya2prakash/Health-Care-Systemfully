
const Doctor = require("../../Model/doctor");

const User = require("../../Model/user");

exports.createDoctor= async(req,res)=>{
    try{

              
         

          
          const { email,specialization, available} = req.body;

          //input me mail aaya hai ya nhi check kro
          

          if(!specialization || !available){
            return res.status(404).json({
                success:false,
                message:" Please fill All the Input .."
            })
          };
           
          if(!email){
            return res.status(404).json({
              success:false,
              message:"Doctor email not Found."
            })
          }

        //   //check kro pahle se hai ya nhi 

          const doctor = await User.findOne({email:email});
          
          if(!doctor){
            return res.status(404).json({
                success:false,
                message:"Doctor Not exist.."
            })
          };

          //ager mil gya to 
        
          //check kro pahle se specialization aur time de to nhi diya

          const checkDocotor = await Doctor.findOne({doctorId:doctor._id});

          if(checkDocotor){
            return res.status(400).json({
              success:false,
              message:"Doctor Profile Already Created.. "
            })
          }
        

          const createDoctor = await Doctor.create({doctorId:doctor._id,
                                                        specialization,
                                                    available
                                                });

           
              if(!createDoctor){
                return res.status(409).json({
                    success:false,
                    message:"Unable To createDoctor profile."
                })
              }  ;
              
              return res.status(201).json({
                success:true,
                message:"Doctor profile Created successfully..",
                Details:createDoctor
              })



    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem while Create the Doctor profile."
        })
    }
}
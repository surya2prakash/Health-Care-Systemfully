
const Doctor = require("../../Model/doctor");

const User = require("../../Model/user");

exports.createDoctor= async(req,res)=>{
    try{

              
          const id = req.params.id;

          if(!id){
            return res.status(404).json({
              success:false,
              message:"Doctor Id not Found."
            })
          }

          const {specialization, available} = req.body;

          //input me mail aaya hai ya nhi check kro
          

          if(!specialization || !available){
            return res.status(404).json({
                success:false,
                message:" Please fill All the Input .."
            })
          };

        //   //check kro pahle se hai ya nhi 

          const doctor = await Doctor.findOne({doctorId:id});

          if(doctor){
            return res.status(404).json({
                success:false,
                message:"Doctor already exist.."
            })
          };

          //ager mil gya to 
                
        

          const createDoctor = await Doctor.create({doctorId:id,
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
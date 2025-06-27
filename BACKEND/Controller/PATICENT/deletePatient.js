
const Patient = require("../../Model/patient");


exports.deletePatient = async(req,res)=>{
          try{
              const id = req.params.id;

              const userId = req.user.id;
             
              if(!id){
                return res.status(404).json({
                  success:false,
                  message:"Id not Found.."
                })
              }

            //check kro user ne ess adhar se patient create kiya hai--->

            const checkExisting = await Patient.findOneAndDelete({_id:id,userId:userId});

            if(!checkExisting){
                return res.status(409).json({
                success:false,
                message:"Patient Not exist. "
            });
            }

            //ager yhan tak aaye matlab user mila hoga aur delete bhi ho gya hoga

            return res.status(201).json({
                success:true,
                message:"Patient  deleted.."
            })


          }catch(err){
           console.error(err);
           return res.status(500).json({
            success:false,
            message:"Problem While Deleting The Patient"
           })
          }

}
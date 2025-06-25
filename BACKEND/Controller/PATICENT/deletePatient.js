
const Patient = require("../../Model/patient");


exports.deletePatient = async(req,res)=>{
          try{
              const {adharNumber} = req.body;

              const userId = req.user.id;
             
              if(!adharNumber){
                return res.status(401).json({
                    success:false,
                    message:"Fill the adhar Number"
                })
              };

            //check kro user ne ess adhar se patient create kiya hai--->

            const checkExisting = await Patient.findOneAndDelete({userId,adharNumber});

            if(!checkExisting){
                return res.status(409).json({
                success:false,
                message:"Patient Not exist. or fill the Adhar correctly.."
            });
            }

            //ager yhan tak aaye matlab user mila hoga aur delete bhi ho gya hoga

            return res.status(201).json({
                success:true,
                message:"Patient Form deleted.."
            })


          }catch(err){
           console.error(err);
           return res.status(500).json({
            success:false,
            message:"Problem While Deleting The Patient"
           })
          }

}
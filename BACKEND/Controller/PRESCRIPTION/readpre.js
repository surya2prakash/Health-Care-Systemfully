


const Prescription = require("../../Model/prescription");
const Patient = require("../../Model/patient");

exports.readPrescription = async(req,res)=>{
    try{

             const {adharNumber} = req.body;

             if(!adharNumber) {
                return res.status(404).json({
                    success:false,
                    message:"Enter Adhar Number."
                })
             };

             //gaer mil gya to user Id inkal lo 


             const user = await Patient.findOne({adharNumber:adharNumber});

             if(!user){
                return res.status(404).json({
                    success:false,
                    message:"Patient Not found.."
                })
             };

             //ager mil gya hai to 

             const id = user.userId;

             const userfound = await Prescription.findOne({userId:id});

             if(!userfound){
                return res.status(404).json({
                    success:false,
                    message:"Prescription Not Found.."
                })
             }
             
     

         return res.status(200).json({
            success:true,
            message:"Prescription Fetched Successfully..",
            prescription:userfound
         })

    }catch(err){
          console.error(err);
          return res.status(500).json({
            success:false,
            message:"Internal Server Problem While Geting Priscription."
          })
    }
}
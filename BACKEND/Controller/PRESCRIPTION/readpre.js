

const prescription = require("../../Model/prescription");
const Prescription = require("../../Model/prescription");


exports.readPrescription = async(req,res)=>{
    try{

        const id = req.user.id;
        let role = req.user.role;

        const prescriptionId = req.params.id;

        if(!id){
            return res.status(404).json({
                success:false,
                message:"Id not Found."
            })
        };
 let checkPrescription ;
        //id mil gai hai to -->
        if(role ==="Patient"){
            checkPrescription = await Prescription.findOne({_id:prescriptionId,userId:id});
        }else {
            checkPrescription = await Prescription.findOne({_id:prescriptionId,doctorId:id});
        }
         

         if(!checkPrescription){
            return res.status(404).json({
                success:false,
                message:"Prescription Not Found"
            })
         };

         return res.status(200).json({
            success:true,
            message:"Prescription Fetched Successfully..",
            prescription:checkPrescription
         })

    }catch(err){
          console.error(err);
          return res.status(500).json({
            success:false,
            message:"Internal Server Problem While Geting Priscription."
          })
    }
}
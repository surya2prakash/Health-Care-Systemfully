
const Prescription = require("../../Model/prescription");

exports.deletePrescription = async(req,res)=>{
    try{

        //id le lo parameter se 

        const prescriptionId = req.params.id;

        //doctor authorized hai

        const doctorId = req.user.id;

    
        //check kro doctor 

        const checkforUpdate = await Prescription.findOneAndDelete({_id:prescriptionId,doctorId:doctorId});

        if(!checkforUpdate){
           return res.status(404).json({
            success:false,
            message:"unable To delete the Prescription.."
           })
        };

      

        
        return res.status(200).json({
            success:true,
            message:"Prescription deleted Sucessfully.."
           

        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error while Prescription delete."
        })
    }
}
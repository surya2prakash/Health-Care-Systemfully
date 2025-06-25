

const Prescription = require("../../Model/prescription");




exports.updatePrescription = async(req,res)=>{
    try{

        //id le lo parameter se 

        const prescriptionId = req.params.id;

        //doctor authorized hai

        const doctorId = req.user.id;

        //body se jo apde krna hai vo lelo

        const {medicines,notes} = req.body;


        if(!medicines && !notes){
            return res.status(400).json({
                       success: false,
                      message: "At least one field (medicines or notes) must be provided to update."
                      });
          }



        //check kro doctor 

        const checkforUpdate = await Prescription.findOne({_id:prescriptionId,doctorId:doctorId});

        if(!checkforUpdate){
           return res.status(404).json({
            success:false,
            message:"Doctor Not Found for the Prescription."
           })
        };

        //update kr do fir

        let updatePrescription = await Prescription.findByIdAndUpdate(prescriptionId,{medicines,notes},{new:true});

        if(!updatePrescription){
            return res.status(500).json({
                success:false,
                message:"Prescription Not updated."
            })
        };

        return res.status(200).json({
            success:true,
            message:"Updated Sucessfully..",
            updated:updatePrescription

        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error while Updating.."
        })
    }
}
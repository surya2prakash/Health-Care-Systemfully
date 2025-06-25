

const Patient = require("../../Model/patient");


exports.getDetails = async(req,res) =>{

    try{

        const {adharNumber} = req.body;

        const userId = req.user.id;

        if(!adharNumber){
            return res.status(400).json({
                success:false,
                message:"Fill the Adhar details"
            })
        };

        const patient = await Patient.findOne({userId:userId,adharNumber:adharNumber});

        if(!patient){
            return res.status(404).json({
                success:false,
                message:"Patient Details Not found ."
            })
        }
        
        return res.status(201).json({
            success:true,
            message:"Patient Details ",
            user:patient
        })

    }catch(err){
       console.error(err);
       return res.status(500).json({
        success:false,
        message:"Problem While Get the details of Patient."
       })
    }
}
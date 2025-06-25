
//doctor khud dekh sakta hai apna time aur jo bhi hoo ------->

const Doctor = require("../../Model/doctor");


exports.doctorgetDetails = async(req,res)=>{
    try{
        
        //doctor authorized hoga eske liye --->

        const userId = req.params.id;

        //check kro doctor hai bhi yaa nhi doctor db me ---->

        const checkPresent = await Doctor.findById(userId);
        if(!checkPresent){
            return res.status(404).json({
                success:false,
                message:"Doctor not found."
            })
        };

        //ager ,mila hai to show kro

        return res.status(200).json({
            success:true,
            message:"Doctor Details",
            doctor:checkPresent
        })

    }catch(err){
       console.error(err);
       return res.status(500).json({
        success:false,
        message:"Problem While doctor getting their details"
       })
    }
}
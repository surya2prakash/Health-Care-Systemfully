

//update me kya kre ga ->
//days aur time?


const Doctor = require("../../Model/doctor");


exports.doctorUpdateDetails= async(req,res)=>{
    try{

        const userId = req.user.id;
          const doctorId = req.params.id;
        const{available} = req.body;
         
        if( !available){
            return res.status(404).json({
                success:false,
                message:"fill the Updated Input you Want."
            })
        }

        if(!doctorId){
            return res.status(400).json({
                success:false,
                message:"Unable to get Doctor Id."
            })
        };

        //sabhi mil gya hai to update kr do --->

        const updateDetails = await Doctor.findByIdAndUpdate(doctorId,{available:available},{new:true}).populate().exec();

        if(!updateDetails){
            return res.status(500).json({
                success:false,
                message:"unable To Update. Doctor Not found."
            })
        };

        //sab sahi to update ho gya hoga

        return res.status(200).json({
            success:true,
            message:"Doctor Profile Updated..",
            docotor:updateDetails
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem While Updating the Doctor Profile"
        })

    }
}
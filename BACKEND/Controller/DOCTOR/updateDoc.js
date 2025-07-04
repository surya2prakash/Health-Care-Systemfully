

//update me kya kre ga ->
//days aur time?


const Doctor = require("../../Model/doctor");


exports.doctorUpdateDetails= async(req,res)=>{
    try{

        
          const id = req.params.id;
        const{available} = req.body;
          console.log(id);
        if( !available){
            return res.status(404).json({
                success:false,
                message:"fill the Updated Input you Want."
            })
        }
           
        if(!id){
            return res.status(404).json({
                success:false,
                message:"Id not found."
            })
        };

          const checkDoctor = await Doctor.findOneAndUpdate({doctorId:id},{available:available},{new:true});

        if(!checkDoctor){
            return res.status(400).json({
                success:false,
                message:"Unable to get Doctor Id."
            })
        };

       
        //sab sahi to update ho gya hoga

        return res.status(200).json({
            success:true,
            message:"Doctor Profile Updated..",
            doctor:checkDoctor
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem While Updating the Doctor Profile"
        })

    }
}
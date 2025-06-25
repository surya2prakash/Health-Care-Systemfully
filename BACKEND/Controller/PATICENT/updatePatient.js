
const Patient = require("../../Model/patient");


exports.updatePatient = async(req,res)=>{
    try{

        const {name,age,phoneNumber} = req.body;

        if( name==="" && age ==="" && phoneNumber==="")
        {
            return res.status(404).json({
                success:false,
                message:"Atleast fill One details to Update the Form.."
            })
        };
      
       


        const userId = req.user.id;

        //ager ek bhi mila hai to update kro

        let updateData = await Patient.findOneAndUpdate({userId:userId},{name,age,phoneNumber},{new:true});

        if(!updateData){
            return res.status(401).json({
                success:false,
                message:"Failed to Update the Patient Data."
            })
        }

        //ager update ho gya hai to success send kro -->

        return res.status(201).json({
            success:true,
            message:"Patient Data Updated.."
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Facing Problem While UpdatIng patient"
        })

    }
}
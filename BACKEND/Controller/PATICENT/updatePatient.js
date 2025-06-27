
const Patient = require("../../Model/patient");


exports.updatePatient = async(req,res)=>{
    try{
                
        const  id = req.params.id;
        let {newName,newAge,newNumber} = req.body;

        if( !newName  && !newAge  && !newNumber)
        {
            return res.status(404).json({
                success:false,
                message:"Atleast fill One details to Update the Form.."
            })
        };

        const userId = req.user.id;
        
        //ager ek bhi mila hai to update kro
        
        let updateData = await Patient.findById(id);

     

 //check kro Patient -> me userId hai ya nhi --------------->
        if(userId !== updateData.userId.toString()){
            return res.status(500).json({
                success:false,
                message:"You are Not Authorized to change the Data.."
            })
        };

        if(!updateData){
            return res.status(401).json({
                success:false,
                message:"Patient Not Found.."
            })
        };


        //ager patient mil gya hai to update kro
        if(newName && newName !==updateData.name){
           updateData=    await Patient.findByIdAndUpdate(id,{name:newName,updatedAt:new Date()},{new:true});
        }

        if(newAge && newAge !== updateData.age){
            updateData=    await Patient.findByIdAndUpdate(id,{age:newAge,updatedAt:new Date()},{new:true});
        }
        
        if(newNumber && newNumber !== updateData.phoneNumber){
            updateData=    await Patient.findByIdAndUpdate(id,{phoneNumber:newNumber,updatedAt:new Date()},{new:true});
        }

        return res.status(201).json({
            success:true,
            message:"Patient Data Updated..",
            patient:updateData
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Facing Problem While UpdatIng patient"
        })

    }
}
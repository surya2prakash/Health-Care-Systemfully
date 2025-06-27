

const Patient = require("../../Model/patient");

//user -----apna patient ko dekh sakta hai----------------->
exports.getAll = async(req,res) =>{

    try{

        const userId = req.user.id;

        const patient = await Patient.find({userId:userId});

        if(!patient){
            return res.status(404).json({
                success:false,
                message:"Patient Details Not found ."
            })
        }
        
        return res.status(201).json({
            success:true,
            message:"Patients Details ",
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



//--getSingle patient ------------------->


exports.getSingle = async(req,res)=>{
    try{

        const userId = req.user.id;
     //id parameter se le liya ---->
        const id = req.params.id;
     
        console.log("userId",userId);
        console.log("id",id);
        //find the patient in db 

        const existpatient = await Patient.findOne({_id:id,userId:userId});

        if(!existpatient){
            return res.status(404).json({
                success:false,
                message:"Patient Not found."
            })
        };



        //mil gy hai to show kro----->

        return res.status(200).json({
            success:true,
            message:"Patient Found.",
            user:existpatient
        })




    }catch(err){
         return res.status(500).json({
        success:false,
        message:"Problem While Get the details of Patient."
       })
    
    }
}


//doctor kyse patient ko dekhe ga ----------------------->


exports.singlePatient= async(req,res)=>{
    try{

      //enter the Adhar
     
       let {adharNumber} = req.body;

        const existpatient = await Patient.findOne({adharNumber:adharNumber});

        if(!existpatient){
            return res.status(404).json({
                success:false,
                message:"Patient Not found."
            })
        };



        //mil gy hai to show kro----->

        return res.status(200).json({
            success:true,
            message:"Patient Found.",
            user:existpatient
        })




    }catch(err){
         return res.status(500).json({
        success:false,
        message:"Problem While Get the details of Patient."
       })
    
    }
}
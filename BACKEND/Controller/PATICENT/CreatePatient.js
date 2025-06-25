

const Patient = require("../../Model/patient");

const User = require("../../Model/user");

const Appointment = require("../../Model/appointment");


exports.createPatient = async(req,res)=>{
    try{
           
        // information from body ---->
        //take adhar Number as a unique Id ---->
        const {name,gender,phoneNumber,age,adharNumber} = req.body;

        const userId = req.user.id;

          if(!name || !gender || !phoneNumber || !age || !adharNumber){
            return res.status(409).json({
                success:false,
                message:"Please fill all the details"
            })
          }


        //check kro pahle se to nhi hai patient ---->

        const existingPatient = await Patient.findOne({adharNumber});
         //if user exist -->
        if(existingPatient){
            return res.status(401).json({
                success:false,
                message:"Patient Already Exist"
            })

        };

        //ager nhi hai to --->

        //create kro ---->

        const newPatient = new Patient({
            name,
            age,
            gender,
            phoneNumber,
            adharNumber,
            userId

        })
      
        await newPatient();

        return res.status(201).json({
            success:true,
            message:"Patient details created Successfully.."
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem While create the Patient."
        })
    }
}
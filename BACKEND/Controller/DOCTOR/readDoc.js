
//doctor khud dekh sakta hai apna time aur jo bhi hoo ------->

const Doctor = require("../../Model/doctor");
const User = require("../../Model/user");

exports.getSpecialization = async(req,res)=>{
    try{
        
        //doctor authorized hoga eske liye --->

        let {specialization} = req.body;



        //check kro doctor hai bhi yaa nhi doctor db me ---->

        const doctorPresent = await Doctor.findOne({specialization});

        if(!doctorPresent){
            return res.status(404).json({
                success:false,
                message:"Doctor not found."
            })
        };

        //ager ,mila hai to show kro

        return res.status(200).json({
            success:true,
            message:"Doctor Details",
            doctor:doctorPresent
        })

    }catch(err){
       console.error(err);
       return res.status(500).json({
        success:false,
        message:"Problem While doctor getting their details"
       })
    }
};


exports.getAllDoctor = async(req,res)=>{
    try{
        
          

        //users me se doctor ke je aao

        let doctors = await User.find({role:"Doctor"});
        
        if(!doctors.length === 0){
            return res.status(404).json({
                success:false,
                message:"No Doctors found"
            })
        };
        
        return res.status(200).json({
            success:true,
            message:"All doctors fetch Successfully",
            Doctors:doctors
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
         success:false,
         message:"Problem While All doctors getting their details"
        })
     }
}



exports.getSingleDoctor= async(req,res)=>{
    try{
     //doctor ki id le ke aao
        const id = req.params.id;
        console.log(id);
        if(!id){
            return res.status(404).json({
                success:false,
                message:"Id not found."
            })
        };

         //doctor ko checck kro hai yaa nhi

         const doctorfind = await Doctor.findById(id);

         if(!doctorfind){
            return res.status(404).json({
                success:false,
                message:"Doctor Not found."
            })
         };

         return res.status(200).json({
            success:true,
            message:"Doctor Found.",
            DoctorFound:doctorfind
         })

    }catch(err){
        console.error(err);
        return res.status(500).json({
         success:false,
         message:"Problem While  doctor getting their details"
        })
     }
}
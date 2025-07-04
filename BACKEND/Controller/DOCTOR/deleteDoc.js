

const Doctor = require("../../Model/doctor");
const User = require("../../Model/user");

//admin hi kre ga ---->

exports.deleteDoctor = async(req,res)=>{
    try{
        const id = req.params.id;

       if(!id){
        return res.status(404).json({
            success:false,
            message:"Fill  Id Not found .."
        })
       };

       //email Id mil gai
      const userFind = await User.findByIdAndDelete(id);
      
      
     
      if(!userFind){
        return res.status(400).json({
            success:false,
            message:"Doctor Not FOund."
        })
       };
      
      
      const deleteFromDoctorSchema = await Doctor.findOneAndDelete({doctorId:id});

      

       //yhan tak aaye matlab doctor user wale Db se aur Doctor wale Schema se Delete ho gya hoga ------>

       return res.status(200).json({
        success:true,
        message:"Doctor Removed Successfully.."
       })

    }catch(err){
        console.error(err);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error while Deleting the Doctor Data."
        })
    }
}
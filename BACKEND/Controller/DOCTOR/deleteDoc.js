

const Doctor = require("../../Model/doctor");
const User = require("../../Model/user");

//admin hi kre ga ---->

exports.deleteDoctor = async(req,res)=>{
    try{
        const {email} = req.body;

       if(!email){
        return res.status(404).json({
            success:false,
            message:"Fill the Email Id .."
        })
       };

       //email Id mil gai
      const userFind = await User.findOne({email:email,role:"Doctor"});
      
      console.log(userFind);
     
      if(!userFind){
        return res.status(400).json({
            success:false,
            message:"Doctor Not FOund."
        })
       };
       const deleteFromDoctorSchema = await Doctor.findOneAndDelete({doctorId:userFind._id});
       const user = await User.findByIdAndDelete(userFind.id);
     

      

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
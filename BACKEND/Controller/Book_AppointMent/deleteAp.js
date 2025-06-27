
const Appointment = require("../../Model/appointment");


exports. deleteAppointment = async(req,res)=>{
          
    try{
        const id = req.params.id;
        const userId = req.user.id;
          if(!userId || !id){
            return res.status(404).json({
                success:false,
                message:"Id not found."
            })
          };

        //check kro id se appointment book hai 


        
        const appointment = await Appointment.findByIdAndDelete(id,{userId:userId});

        if(!appointment){
            return res.status(404).json({
                success:false,
                message:"Appointment Not Found "
            })
        }
         
       

        return res.status(200).json({
            success:true,
            message:"Appointment Deleted"
        })

    }catch(err){
          console.error(err);
          return res.status(500).json({
            success:false,
            message:"Problem while delete Appointment."
          })
    }


} 
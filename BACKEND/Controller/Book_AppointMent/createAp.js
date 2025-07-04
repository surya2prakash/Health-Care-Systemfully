
//appointment Patient create kre ga ------>

const User = require("../../Model/user");

const Doctor =require("../../Model/doctor");

const Appointment = require("../../Model/appointment");


exports.book_Appointment_one = async(req,res)=>{
    try{
        //userId  //kisko dikhana hai
        const userId = req.user.id;

      
        //doctor Id
        const id = req.params.id;


        //check kro user ne same doctor ke pass pahle se to aapointment book nhi kiya hai


        const isbook = await Appointment.findOne({userId:userId})

        if(isbook){
            return res.status(500).json({
                success:false,
                message:"Appointment Already Booked."
            })
        }

        
        //date select kro ---->
        let {appointmentDate} = req.body;
        //esse me doctors ko filter kr lunga

        
            
        const newDate = new Date(appointmentDate);


        let today = new Date();
         today.setHours(0, 0, 0, 0);
          newDate.setHours(0, 0, 0, 0);
         

        if(newDate < today){
            return res.status(500).json({
                success:false,
                message:"Only future Booking Will Allowed.."
            })
        }
        const availableDoctors = await Doctor.findById(id);

               if(!availableDoctors){
                return res.status(404).json({
                    success:false,
                    message:" doctor Not Available "
                })
               }


          //sab sahi hai to appointment book kr do -->

          let book = await Appointment.create({
              userId,
              doctorId:id,
              appointmentDate:newDate,
          })
          
          return  res.status(200).json({
            success:true,
            message:"Appointment Booked..",
              yourAppointment:book
          })

        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error While Creating The Appointment"
        })
    }
}


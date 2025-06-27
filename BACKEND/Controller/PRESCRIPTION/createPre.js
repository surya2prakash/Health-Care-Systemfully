
const Appointment = require("../../Model/appointment");
const User = require("../../Model/user");
const Doctor = require("../../Model/doctor");
const Patient = require("../../Model/patient");
const Prescription = require("../../Model/prescription");


exports.prescriptionCreate =async(req,res)=>{
  try{
      //appointment Id -------------------------->
    const id = req.params.id;
        
         const docId = req.user.id;

         //check kro yee mere 

         if(!id){
             return res.status(404).json({
              success:false,
              message:"Not  found."
             })
         };

         //check kro Appointment Id hai

         const checkAp = await Appointment.findById(id);

         if(!checkAp){
          return res.status(404).json({
            success:false,
            message:"Appointment Not found."
          })
         };

         let {medicines,notes} = req.body;

         if(!medicines || !Array.isArray(medicines) || medicines.length === 0 ){
          return res.status(404).json({
            success:false,
            message:"medicines Not Provided"
          })
         };

         if(!notes){
          return res.status(404).json({
            success:false,
            message:"Notes Must be Needed .."
          })
         }
        

         const docModelId = await Doctor.findOne({doctorId:docId});

         if(!docModelId){
          return res.status(404).json({
            success:false,
            message:"Id Not Found in Doctor Model"
          })
         };

         //find doctor in Appointment 
  
         const docInAp = await Appointment.findOne({doctorId:docModelId._id});


         //wahn bhi mil gya to sahi hai

         //ager mila hai to prescription likho

         let medArry =[];


      let newPrescription = new Prescription({
        appointmentId:id,
        doctorId:docInAp._id,
        userId:checkAp.userId,
        medicines,
        notes

      })
     
      await newPrescription.save();

      return res.status(201).json({
        success:true,
        message:"Prescription Created..",
        Yourprescription:newPrescription
      })

  }catch(err){
        console.error(err);
        return res.status(500).json({
          success:false,
          message:"Internal server Error"
        })
  }
}
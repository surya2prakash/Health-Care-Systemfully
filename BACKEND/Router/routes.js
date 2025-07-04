//import express

const express = require("express");

const route = express.Router();


//signUp ------------->
const {signUp,employeeSignUp,} = require("../Controller/USER/sign_Up");

//logIn--------------->
const{logIn} = require("../Controller/USER/logIn");

//Authentication and Authorization ------------->
const {auth ,isDoctor,isAdmin} = require("../Middleware/auth");

//forget---------------------------->

const {forgetPass} = require("../Controller/USER/forgetPassword");

//otpverification ------------------->

const {otpGen } = require("../Controller/USER/otpverification");

//new PAssword create

const {newPassword } = require("../Controller/USER/genNewPassword");


//---------------------------------------------------------------------------
//patient create --------------------->

const {createPatient } = require("../Controller/PATICENT/CreatePatient");

//patient delete ----------------------->

const {deletePatient} = require("../Controller/PATICENT/deletePatient");

//patient update ----------------------->
const {updatePatient } = require("../Controller/PATICENT/updatePatient");

//patient get ------------------------->
const {getAll, getSingle, singlePatient} = require("../Controller/PATICENT/readPatient");

//--------------------------------------------------------------------------------
//DOCTOR ----------------------------->
//------------------------------------------------------------------------------

const {createDoctor} = require("../Controller/DOCTOR/createDoc");

const {deleteDoctor}= require("../Controller/DOCTOR/deleteDoc");

const {getAllDoctor,getSingleDoctor, getSpecialization }= require("../Controller/DOCTOR/readDoc");

const {doctorUpdateDetails} = require("../Controller/DOCTOR/updateDoc");

//------------------------------------------------------------------------------------------
//Booking Appointment------------------------>
//-------------------------------------------------------------------------------------------



const {book_Appointment_one} = require("../Controller/Book_AppointMent/createAp");

const {deleteAppointment} = require("../Controller/Book_AppointMent/deleteAp");

const {getYourAppointment, getSingleAppointment ,userAppointment} = require("../Controller/Book_AppointMent/readAp");

const{updatePatientAppointment} = require("../Controller/Book_AppointMent/updateAp")


//-------------------------------------------------------------------------------------------------------
//PRESCRIPTION ------------------------------------------------------>
//---------------------------------------------------------------------------------------------------------

const {prescriptionCreate} = require("../Controller/PRESCRIPTION/createPre");

const {readPrescription} = require("../Controller/PRESCRIPTION/readpre");



const {deletePrescription}= require("../Controller/PRESCRIPTION/deletePre");

//-----------------------------------------------------------------------------------------------------------
//Wards----------------------------------------------->
//----------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------

route.post("/sign",signUp);
route.post("/sign_emp",employeeSignUp);

route.post("/login",logIn);
//--------------------------------------------

//---------------------------------------------
route.post("/patient",auth,createPatient);

route.patch("/updatePatient/:id",auth,updatePatient);

route.get("/patients",auth,getAll);

route.get("/patient/:id",auth,getSingle);

route.delete("/remove/:id",auth,deletePatient);

//--------------------------------------------------------
//Doctor-- single patient ko dekhe ga ----->
//---------------------------------------------------
route.get("/patient",auth,isDoctor,singlePatient);


//-----------------------------------------------
//sirf admin hi change kre ga------------------
//------------------------------------------------

route.post("/doctor",auth,isAdmin,createDoctor);
route.patch("/update_doctor/:id",auth,isAdmin,doctorUpdateDetails);
route.delete("/remove_doctor/:id",auth,isAdmin,deleteDoctor);

//---------------------------------------------------------------
//common for all ---- sab use krenge Admin,Patient,Doctor
//--------------------------------------------------------------
route.get("/getAll",auth,getAllDoctor);

route.get("/get/:id",auth,getSingleDoctor);

route.post("/get_specialization",auth,getSpecialization );





//---------------------------------------------------------
//PATIENT ----------------- KAR SAKTA HAI -----------------
//----------------------------------------------------------
route.post("/book-appointment/:id",auth,book_Appointment_one);

route.delete("/delete_appointment/:id",auth,deleteAppointment);

//---------------------------------------------------------
//dOCOTR KAR SAKTA HAI ---------------------------------------------
//-------------------------------------------------------------------
route.get("/getAllbooked",auth,isDoctor,getYourAppointment);

//route.get("/getSingleAp/:id",auth,isDoctor,getSingleAppointment);

route.patch("/update_appointment/:id",auth,isDoctor,updatePatientAppointment);

route.get("/getyourAppointment",auth,userAppointment);



//--------------------------------------------------------------------
//-----------Doctor hi Prescription handle kre ga-------------------
//--------------------------------------------------------------------
route.post("/prescription/:id",auth,isDoctor,prescriptionCreate);

route.delete("/remove_prescription/:id",auth,deletePrescription);


//-------------------------------------------------------------------------

route.post("/get_prescription",auth,readPrescription);


//------------------------------------------------------------------------------
//forgetPassword
//-----------------------------------------------------------------------------
route.post("/forget",forgetPass);
route.post("/otp",otpGen);
route.post("/newPass",newPassword);




module.exports = route;
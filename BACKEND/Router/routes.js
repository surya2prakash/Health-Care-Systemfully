//import express

const express = require("express");

const route = express.Router();


//signUp ------------->
const {signUp,employeeSignUp,} = require("../Controller/USER/sign_Up");

//logIn------->
const{logIn} = require("../Controller/USER/logIn");

//Authentication and Authorization ------>
const {auth ,isDoctor,isAdmin} = require("../Middleware/auth");

//forget------------------->

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
const {getDetails} = require("../Controller/PATICENT/readPatient");

//--------------------------------------------------------------------------------
//DOCTOR ----------------------------->
//------------------------------------------------------------------------------

const {createDoctor} = require("../Controller/DOCTOR/createDoc");

const {deleteDoctor}= require("../Controller/DOCTOR/deleteDoc");

const {doctorgetDetails}= require("../Controller/DOCTOR/readDoc");

const {doctorUpdateDetails} = require("../Controller/DOCTOR/updateDoc");

//-----------------------------------------------------------------------------------
//Booking Appointment------------------------>
//-------------------------------------------------------------------------------------------

const {book_Appointment_two} = require("../Controller/Book_AppointMent/create2ndAp");

const {book_Appointment_one} = require("../Controller/Book_AppointMent/createAp");

const {deleteAppointment} = require("../Controller/Book_AppointMent/deleteAp");

const {doctorAppointments} = require("../Controller/Book_AppointMent/doctorreadAp");

const {getYourAppointment} = require("../Controller/Book_AppointMent/readAp");


//-------------------------------------------------------------------------------------------------------
//PRESCRIPTION ------------------------------------------------------>
//---------------------------------------------------------------------------------------------------------

const {createPrescription} = require("../Controller/PRESCRIPTION/createPre");

const {readPrescription} = require("../Controller/PRESCRIPTION/readpre");

const {updatePrescription} = require("../Controller/PRESCRIPTION/updatePre");

const {deletePrescription}= require("../Controller/PRESCRIPTION/deletePre");

//-----------------------------------------------------------------------------------------------------------
//Admin-----------------------------------------------
//----------------------------------------------------------------------------------------------------------
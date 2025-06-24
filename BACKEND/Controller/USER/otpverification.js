


const OTP = require("../../Model/otp");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.otpGen = async(req,res,next)=>{
    try{
           

        let token = req.header("Authorization");
        //bearer aur space ko token se hta do  sirf token nikalo->
         if(token && token.startsWith('Bearer ')){
              token = token.split(' ')[1];
         }
     
        
         //token verify kro---->

         const payload = jwt.verify(token,process.env.JWT_SECOND);

             req.user = payload;
            const email = req.user.email;

            //verify kro ki email se OTP kya hai

            const {enterOtp} = req.body;

            const otpValue = parseInt(enterOtp);


            const  otpVerify = await OTP.findOne({email,otp:otpValue});

            if(!otpVerify){
                return res.status(409).json({
                    success:false,
                    message:"OTP NOT Matched."
                })
            }


            //ager match kr gya to

          return res.status(201).json({
            success:true,
            message:"Otp verifyed.."
          })
           

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Problem while Genrating Otp"
        })
    }
}
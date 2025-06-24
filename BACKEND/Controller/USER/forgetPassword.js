const User = require("../../Model/user");
const OTP = require("../../Model/otp");

const jwt = require("jsonwebtoken");

exports.forgetPass = async(req,res)=>{
    try{


        


        const {email} = req.body;

        if(!email){
            return res.status(404).json({
                success:false,
                message:"Enter Email"
            })
        };

        //check kro user exist kr rha hai yaa nhi 

        const existUser = await User.findOne({email});

        if(!existUser){
            return res.status(409).json({
                success:false,
                message:'User Not Exist ,Create account .'
            })
        };

        //otp genrate kro 
        const max = 99999;
        const min = 10000;
        const otp = Math.floor(Math.random()*(max-min+1))+ min;


        //ek token create kro lo user ka trak rakhne ke liye

        const payload={
            email:existUser.email
        };

        const token =  jwt.sign(payload,process.env.JWT_SECOND,{expiresIn:'3m'});

        //otp ko OTP Model me send kr do ------>

        let newOtp = new OTP({
            email,
            otp
        });

        await newOtp.save();

        
      return res.status(200).json({
        success:true,
        message:"Otp send.",
        token
      })

    

    }catch(err){
         console.error(err);
         return res.status(500).json({
            success:false,
            message:"Problem while forget Password"
         })
    }
}
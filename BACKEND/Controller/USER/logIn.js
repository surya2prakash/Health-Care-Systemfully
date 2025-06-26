
//import User model 


const User = require("../../Model/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.logIn = async(req,res)=>{
    try{
        let {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill All the Details"
            })
        };

        //check kro user exist kr rha hai yaa nhi 

        const user = await User.findOne({email});

        if(!user){
            return res.status(409).json({
                success:false,
                message:"User Not Exist . Create your Account"
            })
        };

        //ager exist kr rha hai to --->
        //password check kro ->

        const matchPassword = await bcrypt.compare(password,user.password);
        
        if(!matchPassword){
            return res.status(401).json({
                success:false,
                message:"Wrong Password"
            })
        };

        //ager password match ho gya to-->
    
        let token ='';

        let payload={
            id:user._id,
            email:user.email,
            role:user.role,
        }

        password =undefined;
        //token create kro 
         if(user.role === "Patient"){
          token =  jwt.sign(payload,process.env.JWT_SECRET_FOR_PATIENT,{expiresIn:'2h'});
         };

         if(user.role ==="Doctor" || user.role ==="Admin"){
            token =  jwt.sign(payload,process.env.JWT_SECRET_FOR_EMP,{expiresIn:'2h'});
         }
         
      if(!token){
        return res.status(401).json({
            success:false,
            message:"Failed to create token"
        })
      };

      //ager yhan tak aaye matalb token create kr chuke hoo -->

      return res.status(201).json({
        success:true,
        message:"UserLogIn SuccessFully",
        token,
        user:payload
      })


    }catch(err){
        console.error(err.message);

        return res.status(500).json({
            success:false,
            message:"User Facing Problem While LogIn"
        })

    }
}
 
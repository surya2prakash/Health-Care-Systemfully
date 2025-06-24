

const jwt= require("jsonwebtoken");
const User = require("../../Model/user");
const bcrypt = require("bcrypt");



require("dotenv").config();

exports.newPassword = async(req,res)=>{
    try{
        
        let token = req.header("Authorization");

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token not found"
            })
        };


        //ager token mil gya to

          if(token || token.startsWith("Bearer ")){
             token = token.split(" ")[1];
          };
          
          const payload = jwt.verify(token,process.env.JWT_SECOND);
            
          req.user = payload;

            const email = req.user.email;


        const {newPassword,confirmPassword} = req.body;

         if(!newPassword || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Fill both Fileds"
            })
         }


        if(newPassword !== confirmPassword){
            return res.status(409).json({
                success:false,
                message:"Password not match."
            })
        }
        
        

        
        
        //ager yhan tak sahi hai to password ko hash kro aur user ke password ko change kr do------->

        const hashedPassword = await bcrypt.hash(newPassword,10);

    

        if(!hashedPassword){
            return res.status(409).json({
                success:false,
                message:"Unble to hash the password"
            })
        };
        const updatePassword = await User.findOneAndUpdate({email},{password:hashedPassword,updateAt:new Date()},{new:true});

        return res.status(200).json({
            success:true,
            message:"Password Updated SuccessFully.."

        })
        

    }catch(err){
          console.error(err);
          return res.status(500).json({
            success:false,
            message:"Problem While Createing new Password"
          })
    }
}
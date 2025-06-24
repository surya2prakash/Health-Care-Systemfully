
//step-1.user model ko le aao ->
//step-2.user ko check kro pahle se to nhi hai->
//step-3. ager nhi hai to fir user ka password hash kro aur data base me save kr do

const bcrypt = require("bcrypt");

const User = require("../../Model/user");

exports.signUp =async(req,res)=>{
      try{

        const {name,email,password,confirmPassword} = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }


        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password not matchted."
            })
        }

        const user = await User.findOne({email});

        if(user){
            //ager user mila to --->
            return res.status(409).json({
                success:false,
                message:"User Already Created Account"
            })
        }

        const hashedPassword =await bcrypt.hash(password,10);

        if(!hashedPassword){
            return res.status(500).json({
                success:false,
                message:"Unable to hashed the password."
            })
        }
    
        //ager nhi mila to password ko hash kr do -- create kr do user  -->

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            
        });
       
        const userDetails = {
            id:newUser._id,
            email:newUser.email,
            role:newUser.role
        }

        return res.status(201).json({
            success:true,
            message:"Account Created Successfully..",
           user:userDetails
        })


      }catch(err){
        
            console.error(err.message);
            return res.status(500).json({
             success:false,
             message:"Problem while creating account",
             error:err.message      
      
      
      })
    }
}


require("dotenv").config();

exports.employeeSignUp =async(req,res)=>{
        try{

            const{name,email,role,accesscode,password,confirmPassword} = req.body;

            if(!name || !email ||!role || !accesscode || !password || !confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"fill All the details"
                })
            };
          //password match check kro---->

          if(password !== confirmPassword){
            return res.status(409).json({
                success:false,
                message:"Password Not match "
            })
          }

            //code ko import kro
         const matchCodeadmin =process.env.ACCESS_CODE_FOR_ADMIN;
        const matchCodedoctor = process.env.ACCESS_CODE_FOR_DOCTOR;

        //dono me se koi ek pe match hona chahiye ----->
            if(role ==="Admin" && accesscode !== matchCodeadmin){
                return res.status(403).json({
                    success:false,
                    message:"AccessCode Not Match for Admin role"
                })
            }
             if(role === "Doctor" && accesscode !== matchCodedoctor){
                return res.status(403).json({
                    success:false,
                    message:"AccessCode Not Match for Doctor role"
                })
            };
           
           //check kro pahle se to nhi hai

           const existingUser = await User.findOne({email});

           if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User Have already Account "
            })
           };


           //nhi hai to password hash kro aur account create kro --->

           const hashedPassword = await bcrypt.hash(password,10);

           if(!hashedPassword){
            return res.status().json({
                success:false,
                message:"Unable to hashed the password."
            })
           };

           //create user

           const user = new User({
            name,
            email,
            password:hashedPassword,
            role,
           })

             await user.save();


             const userDetails = {
                id:user._id,
                email:user.email,
                role:user.role
            }

             return res.status(201).json({
                success:true,
                message:"Account created successfully..",
                 user:userDetails
             })


        }catch(err){
            console.error(err.message);
            return res.status(500).json({
                success:false,
                message:"Problem while creating Account",
                error:err.message
            })
        }
}
const jwt = require("jsonwebtoken");



require("dotenv").config();

exports.auth = async(req,res,next)=>{
    try{

        //token lana hai header se
        

        let token = req.header("Authorization");
           //bearer aur space ko token se hta do  sirf token nikalo->
            if(token && token.startsWith('Bearer ')){
                 token = token.split(' ')[1];
            }
        
      
//verify krna hai--->token mila nhi to 
       if(!token){
         return res.status(409).json({
            success:false,
            message:"Token not found"
         })
       };


       
         
       //token verify kro-->

      let payload = jwt.decode(token);
       
       //payload me se role nikal lo 

       let role = payload?.role;


             let secretKey = role ==="Patient" ? process.env.JWT_SECRET_FOR_PATIENT:process.env.JWT_SECRET_FOR_EMP;

             //secret key mil gya

         const verifytoken = await jwt.verify(token,secretKey);
         
         if(!verifytoken){
            return res.status(409).json({
                success:false,
                message:"token Invalid"
            })
         }


         //ager token verify ho gya ho to

         req.user=payload;

   next();

    }catch(err){
      console.error(err);
      return res.status(500).json({
        success:false,
        message:"Problem while Auth "
      })
    }
};




exports.isDoctor=(req,res,next)=>{
    try{
    const role = req.user.role;

    if(!role){
        return res.status(404).json({
            success:false,
            message:"Role not found."
        })
    };

    //role mil gya ------>
    //ager user doctor hoga tabhi aage badhe ga---->

    if(role !== "Doctor"){
        return res.status(409).json({
            success:false,
            message:"You are not Authorized for this role."
        })
    };

    //ager role match kr gya to aage badho

    next();
}catch(err)
{
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"Problem While verifyIng the Doctor role."
    })
}
};




exports.isAdmin=(req,res,next)=>{
    try{
    const role = req.user.role;

    if(!role){
        return res.status(404).json({
            success:false,
            message:"Role not found."
        })
    };

    //role mil gya ------>
    //ager user doctor hoga tabhi aage badhe ga---->

    if(role !== "Admin"){
        return res.status(409).json({
            success:false,
            message:"You are not Authorized for this role."
        })
    };

    //ager role match kr gya to aage badho

    next();
}catch(err)
{
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"Problem While verifyIng the Admin role."
    })
}
};

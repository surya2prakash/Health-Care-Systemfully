//DataBase - code

//requirement ------->
//1.database->mongoose 2.dotenv


const mongoose = require("mongoose");

require("dotenv").config();


const db = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewurlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("DataBase connected Sucessfully..")})
    //ager koi error aaya to ->
    .catch((err)=>{
        console.error(err.message);
        console.log("Problem In data base connection..")
        process.exit(1);
    })
}

module.exports =db;
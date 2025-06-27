//import express

const express = require("express");

const app = express();

app.use(express.json());


//import dotenv

require("dotenv").config();

const PORT = process.env.PORT || 8000;

//database ko le ke aao-->
const connect = require("./Storage/storage");
connect();

const routes = require("./Router/routes");
app.use("/api/v1",routes);

app.get("/",(req,res)=>{
    res.send(`<h1>welcome to the Heath-System</h1>`)
})

app.listen(PORT,()=>{
    console.log(`App is listen at http://localhost:${PORT}`);
});

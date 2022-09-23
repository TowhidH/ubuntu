const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;

const {error} = require("./middleware/error");
const Auth = require("./Router/Auth");
const Job = require("./Router/Jobs");
const connect = require("./db/connection");
const {notFound} = require("./middleware/not_found");




//build in middlewares;
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//Apps middlewares;
app.use(Auth);
app.use( "/job" , Job);
app.use(error);
app.use("*" , notFound);

async function start(){

 try {
     await  connect(process.env.DB)
    app.listen(PORT , ()=>{
        console.log(`http://localhost:${PORT}`);
    })
 } catch (error) {
  console.log(error);  
 }
}

start(); 
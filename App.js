const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
var cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require("path");
const helmet = require("helmet")
 
const PORT = process.env.PORT || 8000;

const {error} = require("./middleware/error");
const Auth = require("./Router/Auth");
const Job = require("./Router/Jobs");
const connect = require("./db/connection");
const {notFound} = require("./middleware/not_found");
const {authenticate} = require("./middleware/authenticate");



// //build in middlewares;
app.use(helmet.frameguard({ action: 'DENY' }));
app.use(express.static(path.join(__dirname , "./build")))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname ,  './build/index.html'));
  });
app.use(cookieParser())
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}
));



//Apps middlewares;
app.use(Auth);
app.use(  "/job" ,authenticate , Job);
app.use(error);
app.use("*" , notFound);

async function start(){

 try {
     await  connect(process.env.DB)
    app.listen(PORT , ()=>{
        console.log(`http://127.0.0.1:${PORT}`);
    })
 } catch (error) {
  console.log(error);  
 }
}

start(); 
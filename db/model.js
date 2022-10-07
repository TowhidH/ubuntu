const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

const jobSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : [true , 'please provide the username'] ,
        minlength : 3 , 
        maxlength  : 50

    } , 
     sirname : {
        type : String , 
        required : [true , 'please provide the sirname'] ,
        minlength : 3 , 
        maxlength  : 50

    } , 
    email : {
        type : String , 
        required : [true , "please provide the email"],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique : true

    } , 
    password : {
        type : String , 
        required : [true , "please provide the password"] ,
    } , 
    birth : {
        type : String,
        required : true
    }  , 

    verified : {
    type : Boolean , 
    default : false
    } , 
    Code :{type :  String  }
}, {timestamps : true});
 


jobSchema.pre("save" , async function (){
this.password = await bycrypt.hash(this.password , 10);
var crypto = require('crypto');
let buffer = crypto.randomBytes(3);
this.Code = parseInt(buffer.toString('hex'), 16).toString().substr(0,6);



})



jobSchema.methods.generateToken = async function (next){
let email = this.email;
let token = await jwt.sign({email} , process.env.verification_key);
console.log(token);
return token

}


jobSchema.methods.validateEmail = async function ( email , username , code){
console.log(email , username , code);
 console.log(process.env.email , process.env.password);
        let transporter = nodemailer.createTransport({
            service : "gmail" , 
            host: "127.0.0.1",
            port: 8000,
            secure: false, 
            auth: {
              user: process.env.email, 
              pass: process.env.password,
            },
          });
        
      
          let info = await transporter.sendMail({
            from: 'tawhidyt8@gmail.com', 
            to: email,
            subject: "Code",
            text: "verification Code", 
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
            </head>
            <body>
              <p>hey ${username}</p><br /><br />
              <p>Thanks for signing up with 8pass, you must click this link within 30 days of registration to active your</p><br />
              <button disabled>${code}</button><br />
              <p>have fun with 8ws</p>
            </body>
            </html>`,
          });
      
}


const authModel = mongoose.model("Auth" , jobSchema);
const pending = mongoose.model("pending" , jobSchema);
module.exports  = {authModel  ,pending};


 

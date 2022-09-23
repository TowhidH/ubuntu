const { Async} = require("../middleware/async");
const { StatusCodes} = require("http-status-codes");
const {err} = require("../error/customError");
const {authModel , pending} = require("../db/model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { json } = require("express");

const register = Async(async function (req , res , next){
  const {username , sirname , email , password , birth , conform_password } = req.body;
  console.log(username , sirname , email , password , birth , conform_password);
  if(!username , !sirname , !email , !password , !birth , !conform_password){
    return next(new err(StatusCodes.NOT_ACCEPTABLE, "some fields are missing"))
  }

  if(password !== conform_password ){
    return next(new err(StatusCodes.NOT_ACCEPTABLE, "your conform password doesnt match "))
     
  }
  if(password.search(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) === -1){
    return next(new err(StatusCodes.NOT_ACCEPTABLE, "your password must include a special character like : !,#,@"))
  }

    const resp = await pending.create({
        username , sirname , email , password , birth , password 
    }) 


    let token = await jwt.sign({email , username} , process.env.verification_key);

console.log(token);
    let transporter = nodemailer.createTransport({
      service : "gmail" , 
      host: "127.0.0.1",
      port: 8000,
      secure: false, 
      auth: {
        user: "tawhidyt8@gmail.com", 
        pass: "lqfnilzgzkhyrmgp",
      },
    });
  

    let info = await transporter.sendMail({
      from: 'tawhidyt8@gmail.com', 
      to: email,
      subject: "Hello ✔",
      text: "Hello world?", 
      html: `<button><a href="http://localhost:8000/verify/${token}" >click to verify</a></button>`,
    });
  
    console.log("Message sent: %s" + email );
  
  

    res.status(StatusCodes.CREATED).json({resp : `a conformation message has sent to your ${email} please conform it`})
}); 



const verifiy = Async(async function (req , res, next){


let id = req.params.id
console.log(id);
let x = await jwt.verify(id , process.env.verification_key);
console.log(x);
if(!x){
  res.send("failed")

}
let resp = await pending.find({email : x.email })
if(!resp){
res.send("failed")
}
res.send("u succesfully loged in")

})


 





 








  






const login = Async(async function (req , res , next){
    return res.send("login");
});



module.exports = { register , login , verifiy};
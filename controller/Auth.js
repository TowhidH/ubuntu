const { Async} = require("../middleware/async");
const { StatusCodes} = require("http-status-codes");
const {err} = require("../error/customError");
const {authModel , pending} = require("../db/model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const bycrypt = require("bcryptjs");
require("dotenv").config()


const register = Async(async function (req , res , next){
  console.log(req.cookies.verification);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log(req.body);
  const {username , sirname , email , password , birth , confirm_password } = req.body;
  console.log(username , sirname , email , password , birth , confirm_password);
  if(!username , !sirname , !email , !password , !birth , !confirm_password){
    return next(new err(StatusCodes.NOT_ACCEPTABLE, "some fields are missing"))
  }

  if(password !== confirm_password ){
    return next(new err(StatusCodes.NOT_ACCEPTABLE, "your conform password doesnt match "))
     
  }
  if(password.search(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) === -1){
    return next(new err(StatusCodes.NOT_ACCEPTABLE, "your password must include a special character like : !,#,@"))
  }
  await authModel.deleteMany()
    const resr = await authModel.findOne({email});
   if(resr){
    return res.status(401).json({succesfull : false , "message" : "this user already exsists"})
   }

   
   const resp = await authModel.create({
       username , sirname , email , password , birth , password , Code : "000000"
   }) 
   

   let Token = await resp.generateToken(next);
   let {Code } =  await authModel.findOne({email });
   let validate = resp.validateEmail(email , username , Code )

   console.log("Message sent: %s" + email );
   
    console.log(Token);
   return res.status(StatusCodes.CREATED).json({message : `a conformation code has sent to your ${email} please give it here` , Token})
}); 
 
 
 

const verification = Async(async function (req , res ,next){
  console.log(req.params.id);

  let {email} = await jwt.verify(req.params.id , process.env.verification_key);
  if(!email) {
next(new err(StatusCodes.UNAUTHORIZED , "no token provided"));
  }
let resp = await authModel.findOne({email});
if(!resp){
next(new err(StatusCodes.UNAUTHORIZED , "invalid token"));

}
res.status(StatusCodes.ACCEPTED).json({message : `a conformation code has sent to your ${email} please give it here`})

})



const verifiy = Async(async function (req , res, next){
  // console.log(req.params);
  // console.log(req.body);
  let ip = req.connection.remoteAddress
  console.log(ip);
  if(!req.params.id){
   return next(new err(StatusCodes.UNAUTHORIZED , "no token were given"));
  }
  let resp = await jwt.verify(req.params.id , process.env.verification_key);
  console.log(resp);
  if(!resp){
   return next(new err(StatusCodes.NOT_ACCEPTABLE , "your token expires"))
  }
  let authResp = await authModel.findOne({email : resp.email});
  console.log(authResp.Code);
  if(authResp && Number(authResp.Code) === Number(req.body.code)){
    let resp = await authModel.findByIdAndUpdate({_id : authResp._id} , {$set : {verified : true}} , {
      new : true
    })
    return  res.status(StatusCodes.ACCEPTED).send(`verified please login`)
  } else {
    return next(new err(StatusCodes.FAILED_DEPENDENCY , "code doesn't match"));
 ;
  }

})

const reSendVerifivationEmail = Async(async function (req ,res , next){
  let token = req.cookies.verifiy_email
  console.log(token);
   
})
 





 
 







  



const login = Async(async function (req , res , next){
       let email = req.body.email;
       let password = req.body.password;
       if(!email || !password){
             return next(new err(StatusCodes.NOT_ACCEPTABLE , "Invalid Credentials"))
       }
       const resp  = await authModel.findOne({email});
       if(!resp){
              return next(new err(StatusCodes.NOT_ACCEPTABLE , "Invalid Credentials"))
       }
       if(!resp.verified){
             return res.status(StatusCodes.UNAUTHORIZED).json({message : "you need to verify your email"});
       }
       const dc_bycrypt = await bycrypt.compare(password , resp.password);
       if(!dc_bycrypt){
             return next(new err(StatusCodes.NOT_ACCEPTABLE , "Invalid , Credentials"))
       }
       let token = await resp.generateToken(process.env.auth_key);
       res.cookie("jwt_cookies" , token , {
        httpOnly: true , 
        maxAge: 900
       })

      return res.status(StatusCodes.ACCEPTED).json({message : "log in succesfully"})

});


module.exports = { register , login , verifiy , reSendVerifivationEmail , verification};
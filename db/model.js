const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

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
    }
}, {timestamps : true});
 


jobSchema.pre("save" , async function (){
this.password = await bycrypt.hash(this.password , 10);

})


const authModel = mongoose.model("Auth" , jobSchema);
const pending = mongoose.model("pending" , jobSchema);
module.exports  = {authModel  ,pending};


 
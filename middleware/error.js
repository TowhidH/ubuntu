let { err} = require("../error/customError");
async function error(error , req , res , next){
    if(error instanceof err){
        console.log(error);
        return res.status(error.statusCode).json({succesfull : false , message: error.message})
    }

    console.log(error);
    return res.status(500).json({succesfull: false , message : "some internal issue please try again after somewhile."});
    
}

module.exports = {error}; 
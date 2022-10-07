const authenticate = async function (req , res , next){
let Token = req.cookies.verifiy_email
console.log(Token);
 next()
}



module.exports = { authenticate};

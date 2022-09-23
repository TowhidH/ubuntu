const mongoose = require("mongoose");

const connect = async (url)=>{
    try {
        await mongoose.connect(url , {useNewUrlParser: true , useUnifiedTopology: true});
        console.log("connected" );
        
    } catch (error) {
        console.log(error);
    }


}


module.exports = connect;
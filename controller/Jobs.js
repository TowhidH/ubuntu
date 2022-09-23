const { Async} = require("../middleware/async");

const getAllJob = Async(async function(req , res , next){

    return res.send("getalljobs")
})
const getJob = Async(async function(req , res , next){

    return res.send("getjobs")
})
const createJob = Async(async function(req , res , next){

    return res.send("createjobs")
})
const updateJob = Async(async function(req , res , next){

    return res.send("updatejobs")
})
const deleteJob = Async(async function(req , res , next){

    return res.send("deleteljobs")
})





module.exports = { 
    getAllJob , 
    getJob , 
    createJob , 
    updateJob , 
    deleteJob , 
    
}

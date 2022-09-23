const express = require("express");
const Router = express.Router();
const {
    getAllJob , 
    getJob , 
    createJob , 
    updateJob , 
    deleteJob , 
} = require("../controller/Jobs");

Router.route("/").get(getAllJob).post(createJob);
Router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = Router;
const express = require("express");
const Router = express.Router();
const { register , login , verifiy } = require("../controller/Auth");


Router.post("/register" , register);
Router.post("/login" , login);
Router.get("/verify/:id" , verifiy);


module.exports = Router;
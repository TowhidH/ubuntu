const express = require("express");
const Router = express.Router();
const { register , login , verifiy , reSendVerifivationEmail , verification } = require("../controller/Auth");


Router.post("/register" , register);
Router.get("/verification/:id" , verification );
Router.post("/login" , login);
Router.get("/reSendVerifivationEmail" , reSendVerifivationEmail);
Router.post("/verify/:id" , verifiy);


module.exports = Router;
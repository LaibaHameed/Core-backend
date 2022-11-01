const express = require('express');
const Router = express.Router();


//Accquiring Middlewares
const { AuthorizeAdmin } = require('../middlewares/AdminAuthorization')
//Accquiring Middlewares

//Accquiring Controllers
const {
    AdminRegister,
    AdminLogin
} = require('../controller/AdminManagementController')
//Accquiring Controllers

//Defining Routes
Router.post('/AdminRegister',AdminRegister);  //,AuthorizeAdmin
Router.post('/AdminLogin',AdminLogin);
//Defining Routes

module.exports = Router;
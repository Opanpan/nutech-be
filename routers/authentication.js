const express = require("express");

const authentication = express.Router();
const authController = require("../controllers/authControllers");

authentication.post("/login", authController.loginAction);
authentication.post("/register", authController.registerAction);

module.exports = authentication;

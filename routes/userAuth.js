const express = require("express");
const { signup, login, logout } = require("../controller/userAuthC");
const userAuthRouter = express.Router();

userAuthRouter.post("/SignUp",signup);
userAuthRouter.post("/Login",login);
userAuthRouter.post("/Logout",logout);


module.exports = userAuthRouter;
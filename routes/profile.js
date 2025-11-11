const express = require("express");
const { getProfile } = require("../controller/profileC");
const { Auth } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/Profile",Auth, getProfile);


module.exports = profileRouter;

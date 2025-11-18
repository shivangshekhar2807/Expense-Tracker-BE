const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllContacts,
} = require("../controller/profileC");
const { Auth } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/Profile", Auth, getProfile);
profileRouter.get("/Contacts", Auth, getAllContacts);
profileRouter.patch("/Profile", Auth, updateProfile);

module.exports = profileRouter;

const express = require("express");

const { Auth } = require("../middleware/auth");
const { getReport } = require("../controller/reportC");

const reportRouter = express.Router();

reportRouter.get("/Premium/Report/", Auth, getReport);

module.exports = reportRouter;

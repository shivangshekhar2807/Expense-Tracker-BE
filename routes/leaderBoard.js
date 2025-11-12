const express = require("express");

const { Auth } = require("../middleware/auth");
const { getLeaderBoard } = require("../controller/leaderBoardC");
const leaderBoardRouter = express.Router();

leaderBoardRouter.get("/Premium/Leaderboard", Auth, getLeaderBoard);

module.exports = leaderBoardRouter;

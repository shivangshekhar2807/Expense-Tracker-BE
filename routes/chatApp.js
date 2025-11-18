const express = require("express");

const { Auth } = require("../middleware/auth");
const { addMessageAI, getChats } = require("../controller/chatC");

const ChatRouter = express.Router();

ChatRouter.post("/Chat/message/AI", Auth, addMessageAI);
ChatRouter.get("/Chat/message", Auth, getChats);

module.exports = ChatRouter;

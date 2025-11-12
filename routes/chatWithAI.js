const express = require("express");

const { Auth } = require("../middleware/auth");
const { addChatAi, getChatAi } = require("../controller/chatWithAiC");
const aiRouter = express.Router();

aiRouter.post("/Expense/Premium/Ai", Auth, addChatAi);
aiRouter.get("/Expense/Premium/Ai", Auth, getChatAi);

module.exports = aiRouter;

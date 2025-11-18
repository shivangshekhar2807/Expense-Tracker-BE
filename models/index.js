const userModel = require("./user");
const expenseModel = require("./expense");
const DB=require("../database/DBconnect");
const promptResponseModel = require("./promptAI");
const orderPaymentModel = require("./orderPayment");
const chatModel = require("./chat");
const messageModel = require("./messages");

//1:M 

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

//1:M

userModel.hasMany(promptResponseModel);
promptResponseModel.belongsTo(userModel);

//1:M

userModel.hasMany(orderPaymentModel);
orderPaymentModel.belongsTo(userModel);


// Users → Chat

userModel.hasMany(chatModel, { foreignKey: "User_1" });
userModel.hasMany(chatModel, { foreignKey: "User_2" });

chatModel.belongsTo(userModel, { foreignKey: "User_1", as: "User1" });
chatModel.belongsTo(userModel, { foreignKey: "User_2", as: "User2" });

// Chat → Messages

chatModel.hasMany(messageModel, { foreignKey: "chatId" });
messageModel.belongsTo(chatModel, { foreignKey: "chatId" });

// User → Messages (sender)

userModel.hasMany(messageModel, { foreignKey: "Sender_id" });
messageModel.belongsTo(userModel, { foreignKey: "Sender_id", as: "Sender" });


module.exports = {
  DB,
  userModel,
  expenseModel,
  promptResponseModel,
  orderPaymentModel,
  chatModel,
  messageModel,
};



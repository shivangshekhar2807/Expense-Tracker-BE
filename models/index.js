const userModel = require("./user");
const expenseModel = require("./expense");
const DB=require("../database/DBconnect");
const promptResponseModel = require("./promptAI");
const orderPaymentModel = require("./orderPayment");

//1:M 

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

//1:M

userModel.hasMany(promptResponseModel);
promptResponseModel.belongsTo(userModel);

//1:M

userModel.hasMany(orderPaymentModel);
orderPaymentModel.belongsTo(userModel);


module.exports = {
  DB,
  userModel,
  expenseModel,
  promptResponseModel,
  orderPaymentModel,
};



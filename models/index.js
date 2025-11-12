const userModel = require("./user");
const expenseModel = require("./expense");
const DB=require("../database/DBconnect");
const promptResponseModel = require("./promptAI");

//1:M 

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

//1:M

userModel.hasMany(promptResponseModel);
promptResponseModel.belongsTo(userModel);


module.exports = { DB, userModel, expenseModel, promptResponseModel };



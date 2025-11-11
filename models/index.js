const userModel = require("./user");
const expenseModel = require("./expense");
const DB=require("../database/DBconnect")

//1:M 

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);


module.exports = { DB, userModel, expenseModel };



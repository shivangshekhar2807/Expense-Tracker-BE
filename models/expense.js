const { DataTypes, Sequelize } = require("sequelize");
const DB = require("../database/DBconnect");

const expenseModel = DB.define("Expenses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ExpenseAmount: {
    type: DataTypes.FLOAT, // You can use DECIMAL if you want exact precision
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = expenseModel;


const { DataTypes, Sequelize } = require("sequelize");
const DB=require("../database/DBconnect")

const userModel = DB.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  photoUrl: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },

  Total_Expense: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  Wallet_Balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  Premium: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});


module.exports = userModel;
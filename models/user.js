
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
    allowNull: true,
    unique:true
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});


module.exports = userModel;
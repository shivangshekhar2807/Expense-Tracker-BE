const { DataTypes } = require("sequelize");
const DB = require("../database/DBconnect");

const chatModel = DB.define("Chats", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  User_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  User_2: {
    type: DataTypes.INTEGER, // FIXED
    allowNull: false,
  },
});

module.exports = chatModel;

const { DataTypes } = require("sequelize");
const DB = require("../database/DBconnect");

const messageModel = DB.define("Messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  chatId: {
    // IMPORTANT
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = messageModel;

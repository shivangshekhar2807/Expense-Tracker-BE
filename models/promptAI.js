const { DataTypes } = require("sequelize");
const DB = require("../database/DBconnect");

const promptResponseModel = DB.define("PromptResponses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Prompt: {
    type: DataTypes.TEXT("long"), // Allows very large text (up to ~4GB in MySQL)
    allowNull: false,
  },
  Response: {
    type: DataTypes.TEXT("long"), // For long AI or chat responses
    allowNull: false,
  },
});

module.exports = promptResponseModel;

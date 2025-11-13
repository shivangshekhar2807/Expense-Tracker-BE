const { DataTypes } = require("sequelize");
const DB = require("../database/DBconnect");


const orderPaymentModel = DB.define(
  "OrderPayments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    orderId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    paymentId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    amount_paid: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.BIGINT, // timestamp as number
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "INR",
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    // Notes field (stored as JSON)
    notes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  
);



module.exports = orderPaymentModel;

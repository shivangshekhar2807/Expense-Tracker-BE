const { Sequelize } = require("sequelize")

const DB = new Sequelize(
  "Expense_Tracker",
  "root",
  process.env.DB_ROOT_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = DB;
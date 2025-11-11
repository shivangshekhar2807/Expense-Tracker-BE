const express = require("express");
const { signup, login, logout } = require("../controller/userAuthC");
const {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseC");
const { Auth } = require("../middleware/auth");
const expenseRouter = express.Router();

expenseRouter.post("/Expense",Auth, addExpense);
expenseRouter.get("/Expense",Auth, getExpense);
expenseRouter.patch("/Expense/:Id",Auth, updateExpense);
expenseRouter.delete("/Expense/:Id",Auth, deleteExpense);

module.exports = expenseRouter;

const mongoose = require("mongoose")
const UserSchema = require("./User")
const ExpenseSchema = require("./Expense")
const IncomeSchema = require("./Income")
const BudgetSchema = require("./Budget")

const User = mongoose.model("User", UserSchema)
const Expense = mongoose.model("Expense", ExpenseSchema)
const Income = mongoose.model("Income", IncomeSchema)
const Budget = mongoose.model("Budget", BudgetSchema)

module.exports = {
  User,
  Expense,
  Income,
  Budget,
}

const mongoose = require("mongoose")
const UserSchema = require("./User")
const ExpenseSchema = require("./Expense")
const IncomeSchema = require("./Income")

const User = mongoose.model("User", UserSchema)
const Expense = mongoose.model("Expense", ExpenseSchema)
const Income = mongoose.model("Income", IncomeSchema)

module.exports = {
  User,
  Expense,
  Income,
}

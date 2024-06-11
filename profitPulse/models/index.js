const mongoose = require("mongoose")
const userSchema = require("./User")
const ExpenseSchema = require("./expense")

const User = mongoose.model("User", userSchema)
const Expense = mongoose.model("expense", ExpenseSchema)

module.exports = {
  User,
  Expense,
}

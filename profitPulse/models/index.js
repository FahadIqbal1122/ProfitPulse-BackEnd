const mongoose = require("mongoose")
const UserSchema = require("./User")
const ExpenseSchema = require("./Expense")

const User = mongoose.model("User", UserSchema)
const Expense = mongoose.model("Expense", ExpenseSchema)

module.exports = {
  User,
  Expense,
}

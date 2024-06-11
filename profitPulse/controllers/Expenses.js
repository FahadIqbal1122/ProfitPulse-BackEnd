const { Expense } = require("../models")

const GetExpense = async (req, res) => {
  try {
    const expenses = await Post.find({})
    res.send(expenses)
  } catch (error) {
    throw error
  }
}

const CreateExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body })
    res.send(expense)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetExpense,
  CreateExpense,
}

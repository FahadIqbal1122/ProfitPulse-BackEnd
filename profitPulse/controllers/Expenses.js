const Expense = require("../models/expense")
const GetExpense = async (req, res) => {
  try {
    const expense = await Expense.find({})
    res.send(expense)
  } catch (error) {
    throw error
  }
}
// function Index - to create index
async function index(req, res) {
  try {
    const userId = req.userId
    const expenses = await Expense.find({ userId })
    res.send(expenses)
  } catch (error) {
    console.error("Error fetching expenses:", error)
  }
}

// createExpense
const createExpense = async (req, res) => {
  try {
    const userId = req.userId
    const expense = new Expense({ ...req.body })
    const savedExpense = await expense.save()
    res.send(savedExpense)
  } catch (error) {
    console.error("Error creating expenses:", error)
  }
}

const deleteExpense = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.expense_id })
    res.send({
      msg: "Expense Deleted",
      payload: req.params.expense_id,
      status: "Ok",
    })
  } catch (error) {
    throw error
  }
}

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.expense_id,
      req.body,
      { new: true }
    )
    res.send(expense)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetExpense,
  createExpense,
  deleteExpense,
  updateExpense,
}

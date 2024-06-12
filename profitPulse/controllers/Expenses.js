<<<<<<< HEAD
=======
const { Expense } = require("../models")

const GetExpenses = async (req, res) => {
  try {
    const userId = req.user._id
    const expenses = await Expense.find({ userId })
    res.send(expenses)
  } catch (error) {
    console.error("Error fetching expenses:", error)
  }
}

const CreateExpense = async (req, res) => {
  try {
    const userId = req.user._id
    const newExpense = new Expense({ ...req.body, userId })
    const savedExpense = await newExpense.save()
    res.send(savedExpense)
  } catch (error) {
    console.error("Error creating expense:", error)
  }
}

const DeleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id
    const deletedExpense = await Expense.findByIdAndDelete(expenseId)

    if (!deletedExpense) {
      return res.status(404).send("Expense not found")
    }

    res.send({
      msg: "Expense Deleted",
      payload: req.params.expenseId,
      status: "Ok",
    })
  } catch (error) {
    console.error("Error deleting expense:", error)
  }
}

const UpdateExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
      { new: true }
    )

    if (!updatedExpense) {
      return res.status(404).send("Expense not found")
    }

    res.send(updatedExpense)
  } catch (error) {
    console.error("Error updating expense:", error)
  }
}

module.exports = {
  GetExpenses,
  CreateExpense,
  DeleteExpense,
  UpdateExpense,
}
>>>>>>> origin

<<<<<<< HEAD
const { Expense } = require("../models")

const GetExpenses = async (req, res) => {
  try {
    const userId = req.userId
    const expenses = await Expense.find({ userId })
    res.send(expenses)
  } catch (error) {
    console.error("Error fetching expenses:", error)
  }
}

const CreateExpense = async (req, res) => {
  try {
    const expense = new Expense({ ...req.body })
    const savedExpense = await expense.save()
    res.send(savedExpense)
  } catch (error) {
    console.error("Error creating expense:", error)
  }
}

const DeleteExpense = async (req, res) => {
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
=======
>>>>>>> 8498628 (-)

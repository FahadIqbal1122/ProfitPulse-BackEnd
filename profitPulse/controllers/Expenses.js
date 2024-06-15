const { Expense, User, Budget } = require("../models")

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
    const { userId, note, amount, budgetId } = req.body

    if (!userId || !note || !amount || !budgetId) {
      console.log("Missing required fields: userId, note, amount, budgetId")
    }

    const expense = new Expense({ note, amount, userId, budget: budgetId })
    const [savedExpense, budget] = await Promise.all([
      expense.save(),
      Budget.findById(budgetId),
    ])

    if (!budget || budget.userId.toString() !== userId) {
      console.log("Invalid or non-existent budget")
    }

    if (budget.amount + amount > budget.limit) {
      return res.status(400).send("Expense exceeds budget limit")
    }

    budget.amount += amount
    await budget.save()

    const user = await User.findById(userId)
    if (user) {
      user.totalExpense += amount
      await user.save()
    }

    res.send(savedExpense)
  } catch (error) {
    console.error("Error creating expense:", error)
  }
}

const DeleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id

    const expense = await Expense.findById(expenseId).populate("budget")

    if (!expense) {
      console.log("Expense not found")
    }

    const user = await User.findById(expense.userId)
    if (user) {
      user.totalExpense -= expense.amount
      await user.save()
    }

    if (expense.budget) {
      expense.budget.amount -= expense.amount
      await expense.budget.save()
    }

    await Expense.deleteOne({ _id: expenseId })

    res.send({
      msg: "Expense Deleted",
      payload: expenseId,
      status: "Ok",
    })
  } catch (error) {
    console.error("Error deleting expense:", error)
  }
}

const UpdateExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id
    const { amount } = req.body

    if (!amount) {
      return res.status(400).send("Missing required field: amount")
    }

    const expenseToUpdate = await Expense.findById(expenseId).populate("budget")

    if (!expenseToUpdate) {
      return res.status(404).send("Expense not found")
    }

    const updateAmount = amount - expenseToUpdate.amount

    if (
      expenseToUpdate.budget &&
      expenseToUpdate.budget.amount + updateAmount >
        expenseToUpdate.budget.limit
    ) {
      return res.status(400).send("Expense exceeds budget limit")
    }

    const user = await User.findById(expenseToUpdate.userId)
    if (user) {
      user.totalExpense -= expenseToUpdate.amount
      user.totalExpense += amount
      await user.save()
    }

    if (expenseToUpdate.budget) {
      expenseToUpdate.budget.amount += updateAmount
      await expenseToUpdate.budget.save()
    }

    expenseToUpdate.amount = amount
    await expenseToUpdate.save()

    res.send(expenseToUpdate)
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

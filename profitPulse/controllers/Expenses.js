const { Expense, User, Budget } = require("../models")

const GetExpenses = async (req, res) => {
  try {
    const userId = req.params.userId
    const expenses = await Expense.find({ userId })
    res.send(expenses)
  } catch (error) {
    console.error("Error fetching expenses:", error)
  }
}

const CreateExpense = async (req, res) => {
  try {
    const { userId, note, amount, budgetId } = req.body
    if (!userId || !note ||  !amount || !budgetId) {
      console.log("Missing required fields: userId, note, amount, budgetId")
      return res.status(400).send("Missing required fields")
    }
    const budget = await Budget.findById(budgetId)
    if (!budget || budget.userId.toString() !== userId) {
      console.log("Invalid or non-existent budget")
      return res.status(400).send("Invalid or non-existent budget")
    }
    const numAmount = +amount
    if (budget.amount + numAmount > budget.limit) {
      return res.status(400).send("Expense exceeds budget limit")
    }
    budget.amount += numAmount
    await budget.save()
    const savedExpense = new Expense({ note, amount, userId, budget: budgetId })
    await savedExpense.save()
    const user = await User.findById(userId)
    if (user) {
      user.totalExpense += numAmount
      await user.save()
    }
    res.send(savedExpense)
  } catch (error) {
    console.error("Error creating expense:", error)
    res.status(500).send("Internal Server Error")
  }
}

const DeleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id

    const expense = await Expense.findById(expenseId)

    // const expense = await Expense.findById(expenseId).populate("budget")

    if (!expense) {
      console.log("Expense not found")
      return res.status(404).send({ error: "Expense not found" })
    }

    const user = await User.findById(expense.userId)
    if (user) {
      user.totalExpense -= Number(expense.amount)
      await user.save()
    }
     const budget = await Budget.findById(expense.budget)
    if (budget) {
      budget.amount -= Number(expense.amount)
      await budget.save()
    }
    
    await Expense.findByIdAndDelete(expenseId)
    // await Expense.deleteOne({ _id: expenseId })

    return res.status(200).send({
      msg: "Expense Deleted",
      payload: expenseId,
      status: "Ok",
    })
  } catch (error) {
    console.error("Error deleting expense:", error)
    return res.status(500).send({ error: "Failed to delete expense" })
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

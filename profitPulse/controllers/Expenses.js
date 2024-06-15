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
      return res
        .status(400)
        .send("Missing required fields: userId, note, amount, budgetId")
    }

    const expense = new Expense({ note, amount, userId, budget: budgetId })
    const [savedExpense, budget] = await Promise.all([
      expense.save(),
      Budget.findById(budgetId),
    ])

    if (!budget || budget.userId.toString() !== userId) {
      return res.status(404).send("Invalid or non-existent budget")
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
    res.status(500).send("Internal Server Error")
  }
}

const DeleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id
    const expense = await Expense.findById(expenseId).populate("userId")
    const user = expense.userId
    user.totalExpense = user.totalExpense - expense.amount
    await user.save()
    await Expense.deleteOne({ _id: expenseId })
    res.send({
      msg: "expense Deleted",
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
    const expenseToUpdate = await Expense.findById(expenseId).populate("userId")

    if (!expenseToUpdate) {
      console.log("Expense not found")
    }
    const user = await User.findOne({ _id: expenseToUpdate.userId })
    console.log(`user ${user}`)
    let updateAmount = req.body.amount

    if (updateAmount) {
      console.log(`updating user data`)
      const oldExpenseValue = expenseToUpdate.amount
      console.log(`oldExpenseValue ${oldExpenseValue}`)
      console.log(`updateAmount ${updateAmount}`)
      console.log(
        `user.totalExpense - oldExpenseValue + updateAmount ${
          user.totalExpense - oldExpenseValue + updateAmount
        }`
      )
      expenseToUpdate.amount = updateAmount
      user.totalExpense = user.totalExpense - oldExpenseValue + updateAmount
      console.log(`after user update ${user}`)
    }

    await user.save()
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

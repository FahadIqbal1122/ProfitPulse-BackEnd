const { Expense, User } = require("../models")

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
    const userId = req.body.userId
    const expense = new Expense({ ...req.body, userId })
    const savedExpense = await expense.save()
    const user = await User.findById(userId)
    user.totalExpense = user.totalExpense + expense.amount
    await user.save()
    res.send(savedExpense)
  } catch (error) {
    console.error("Error creating expense:", error)
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

// const UpdateExpense = async (req, res) => {
//   try {
//     const expenseId = req.params.expense_id
//     const updatedExpense = await Expense.findByIdAndUpdate(
//       expenseId,
//       req.body,
//       { new: true }
//     )

//     if (!updatedExpense) {
//       return res.status(404).send("Expense not found")
//     }

//     res.send(updatedExpense)
//   } catch (error) {
//     console.error("Error updating expense:", error)
//   }
// }

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

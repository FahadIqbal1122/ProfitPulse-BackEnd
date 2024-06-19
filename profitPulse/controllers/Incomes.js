const { Income, User } = require("../models")

// GetIncome
const GetIncome = async (req, res) => {
  try {
    const userId = req.params.userId
    const incomes = await Income.find({ userId })
    res.send(incomes)
  } catch (error) {
    console.error("Error fetching incomes:", error)
  }
}
//test
// createIncome
const createIncome = async (req, res) => {
  try {
    const userId = req.body.userId
    const income = new Income({ ...req.body, userId })
    const savedIncome = await income.save()
    const user = await User.findById(userId)
    user.totalIncome = user.totalIncome + income.amount
    await user.save()
    res.send(savedIncome)
  } catch (error) {
    console.error("Error creating income:", error)
  }
}

const deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.income_id
    const income = await Income.findById(incomeId).populate("userId")
    const user = income.userId
    user.totalIncome = user.totalIncome - income.amount
    await user.save()
    await Income.deleteOne({ _id: incomeId })
    res.send({
      msg: "Income Deleted",
      payload: incomeId,
      status: "Ok",
    })
  } catch (error) {
    console.error("Error deleting income:", error)
  }
}

const updateIncome = async (req, res) => {
  try {
    const incomeId = req.params.income_id
    const incomeToUpdate = await Income.findById(incomeId).populate("userId")

    if (!incomeToUpdate) {
      console.log("Income not found")
    }
    const user = await User.findOne({ _id: incomeToUpdate.userId })
    console.log(`user ${user}`)
    let updateAmount = req.body.amount

    if (updateAmount) {
      console.log(`updating user data`)
      // incomeToUpdate.amount = updateAmount
      const oldIncomeValue = incomeToUpdate.amount
      console.log(`oldIncomeValue ${oldIncomeValue}`)
      console.log(`updateAmount ${updateAmount}`)
      console.log(
        `user.totalIncome - oldIncomeValue + updateAmount ${
          user.totalIncome - oldIncomeValue + updateAmount
        }`
      )
      incomeToUpdate.amount = updateAmount
      user.totalIncome = user.totalIncome - oldIncomeValue + updateAmount
      console.log(`after user update ${user}`)
    }

    await user.save()
    await incomeToUpdate.save()
    res.send(incomeToUpdate)
  } catch (error) {
    console.error("Error updating income:", error)
  }
}

module.exports = {
  GetIncome,
  createIncome,
  deleteIncome,
  updateIncome,
}

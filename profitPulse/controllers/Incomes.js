const { Income, User } = require("../models")

// GetIncome
const GetIncome = async (req, res) => {
  try {
    const userId = req.userId
    const incomes = await Income.find({ userId })
    res.send(incomes)
  } catch (error) {
    console.error("Error fetching incomes:", error)
  }
}

// createIncome
const createIncome = async (req, res) => {
  try {
    const userId = req.body.userId
    const income = new Income({ ...req.body, userId })
    const savedIncome = await income.save()
    const user = await User.findById(userId)

    if (!user) {
      console.log("User not found")
    }

    user.totalIncome = user.totalIncome + income.amount

    await user.save()
    res.send(savedIncome)
  } catch (error) {
    console.error("Error creating income:", error)
  }
}

const deleteIncome = async (req, res) => {
  try {
    await Income.deleteOne({ _id: req.params.income_id })
    res.send({
      msg: "Income Deleted",
      payload: req.params.income_id,
      status: "Ok",
    })
  } catch (error) {
    throw error
  }
}

const updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(
      req.params.income_id,
      req.body,
      { new: true }
    )
    res.send(income)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetIncome,
  createIncome,
  deleteIncome,
  updateIncome,
}

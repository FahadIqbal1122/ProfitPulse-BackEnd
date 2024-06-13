const Income = require("../models/income")
const GetIncome = async (req, res) => {
  try {
    const income = await Income.find({})
    res.send(income)
  } catch (error) {
    throw error
  }
}
// function Index - to create index
async function index(req, res) {
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
    const userId = req.userId
    const income = new Income({ ...req.body })
    const savedIncome = await income.save()
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

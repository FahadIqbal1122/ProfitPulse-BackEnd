const { Budget } = require("../models")

const getBudget = async (req, res) => {
  try {
    console.log(req.params)
    const userId = req.params.userId
    const budget = await Budget.find({ userId })
    res.send(budget)
  } catch (error) {
    // throw error
    console.error("Error fetching budgets:", error)
  }
}

async function create(req, res) {
  try {
    const budget = new Budget({ ...req.body })
    budget.amount = 0
    const savedBudget = await budget.save()
    res.send(savedBudget)
  } catch (error) {
    console.error("Error creating budget:", error)
  }
}

async function deleteBudget(req, res) {
  try {
    await Budget.deleteOne({ _id: req.params.budgetsId })
    res.send({
      msg: "Budget Deleted",
      payload: req.params.budget_id,
      status: "Ok",
    })
  } catch (error) {
    throw error
  }
}

const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(
      req.params.budget_id,
      req.body,
      { new: true }
    )
    res.send(budget)
  } catch (error) {
    throw error
  }
}
module.exports = {
  create,
  update: updateBudget,
  delete: deleteBudget,
  getBudget,
}

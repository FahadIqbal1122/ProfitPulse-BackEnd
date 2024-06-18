const { Budget } = require('../models')

const getBudget = async (req, res) => {
  try {
    const userId = req.userId
    const budget = await Budget.find({ userId })
    res.send(budget)
  } catch (error) {
    throw error
  }
}

async function create(req, res) {
  console.log(req.body + 'create function body')
  try {
    const userId = req.userId
    const budget = new Budget({ ...req.body })
    const savedBudget = await budget.save()
    res.send(savedBudget)
  } catch (error) {
    console.error('Error creating budget:', error)
  }
}

async function deleteBudget(req, res) {
  try {
    await Budget.deleteOne({ _id: req.params.budget_id })
    res.send({
      msg: 'Budget Deleted',
      payload: req.params.budget_id,
      status: 'Ok'
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
  getBudget
}

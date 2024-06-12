const { Budget } = require("../models")

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.find({})
    res.send(budget)
  } catch (error) {
    throw error
  }
}

async function create(req, res) {
  const budget = await Budget.findById(req.params.id)
  req.body.user = req.user._id
  budget.push(req.body)
  try {
    await budget.save()
  } catch (err) {
    console.log(err)
  }
  res.redirect(`/budget/${budget._id}`)
}

async function deleteBudget(req, res) {
  const budget = await Budget.findOne({
    "budget._id": req.params.id,
    "budgets.user": req.user._id,
  })
  if (!budget) return res.redirect("/budget")
  budget.remove(req.params.id)
  await budget.save()
  res.redirect(`/budgets/${budget._id}`)
}

const update = async (req, res) => {
  try {
    const budget = await Budget.findById(req.user.budget)

    const updatedBudget = await budget.save()

    res.redirect(`/budget`)
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  create,
  update,
  delete: deleteBudget,
  getBudget,
}

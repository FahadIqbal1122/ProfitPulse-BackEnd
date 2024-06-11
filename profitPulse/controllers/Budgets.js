const Budget = require('../models/budget')

const create = async (req, res) => {
  try {
    const budget = await Budget.create(req.params.id)
    budget.push(req.body.budgetId)
  } catch (err) {
    console.log(err)
    res.render('budgets/') //render to the view page
  }
}

module.exports = {
  create
}

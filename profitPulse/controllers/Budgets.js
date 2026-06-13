const { Budget } = require("../models")

const getBudget = async (req, res) => {
  try {
    console.log(req.params)
    const userId = req.params.userId
    const budget = await Budget.find({ userId })
    return res.status(200).send(budget)
  } catch (error) {
    // throw error
   console.error("Error fetching budgets:", error);
    return res.status(500).send({ error: "Failed to get budgets" });
  }
  }

  // CREATE budget

async function create(req, res) {
  try {
    const budget = new Budget(req.body )
    budget.amount = 0
    const savedBudget = await budget.save()
    return res.status(200).send(savedBudget)
  } catch (error) {
    console.error("Error creating budget:", error)
    return res.status(500).send({ error: "Failed to create budget" })
  }
}
// DELETE budget
async function deleteBudget(req, res) {
  try {
    // Find a budget by its ID and delete it in one step
    await Budget.findByIdAndDelete(req.params.id);
    // Delete one document where _id matches the given value
     // await Budget.deleteOne({ _id: req.params.budgetsId })
   return res.send({
      msg: "Budget Deleted",
      payload: req.params.id,
      // payload: req.params.budget_id,
      status: "Ok",
    })
  } catch (error) {
       console.error("Error deleting budget:", error);
    return res.status(500).send({ error: "Failed to delete budget" });
  }
}
// UPDATE budget
const updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      // req.params.budget_id,
       req.params.id,
      req.body,
      { new: true }
    )
     if (!updatedBudget) {
      return res.status(404).send({ error: "Budget not found" })
    }

   return res.status(200).send(updatedBudget)
  } catch (error) {
   console.error("Error updating budget:", error);
    return res.status(500).send({ error: "Failed to update budget" });
  }
}
module.exports = {
  create,
  update: updateBudget,
  delete: deleteBudget,
  getBudget,
}

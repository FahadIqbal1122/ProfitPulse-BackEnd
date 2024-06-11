const Expense = require("../models/expense")
module.exports = {
  index,
  show,
}
// function Index - to create index
async function index(req, res) {
  try {
    // find expenses by id
    let expenses = await Expense.find({}).populate("id")
    res.render("expenses/index", { title: "All Expenses, expenses " })
  } catch (error) {
    console.log("error fetching expenses:,", error)
  }
}

async function show(req, res) {
  try {
    // showing expenses byId (req.params.Id)
    const expense = await Expense.findById(req.params.id).populate("id")
    if (!expense) {
      return res.render(404).send("Expense not found")
    }
    res.render("expenses/show", { title: "All Expenses Details, expense" })
  } catch (error) {
    console.error("Error fetching expenses details:,error")
  }
}

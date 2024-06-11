const Income = require("../models/income")
module.exports = {
  index,
  show,
  new: newIncome,
}
// function Index - to create index
async function index(req, res) {
  try {
    // find incomes  by id
    let incomes = await Income.find({}).populate("id")
    res.render("income/index", { title: "All Incomes, incomes " })
  } catch (error) {
    console.log("error fetching incomes:,", error)
  }
}

async function show(req, res) {
  try {
    // showing incomes byId (req.params.Id)
    const income = await Income.findById(req.params.id).populate("id")
    if (!income) {
      return res.render(404).send("Income not found")
    }
    res.render("income/show", { title: "All Income Details, income" })
  } catch (error) {
    console.error("Error fetching incomes details:,error")
  }
  // add Income
}
function newIncome(req, res) {
  res.render("income/new", { title: "Add Income", errorMsg: "" })
}
async function createIncome(res, res) {
  try {
    // Create a new instance of the Income model using data from req.body
    const income = new income(req.body)
    if (income.name) {
      income.name = income.name.toUpperCase()
    }
    if (income.price) {
      income.price = income.price.toString()
    }
  } catch (error) {}
}

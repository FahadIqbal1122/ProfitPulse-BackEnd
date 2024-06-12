const income = require("../models/income")
const Income = require("../models/income")
module.exports = {
  index,
  show,
  new: newIncome,
  create,
  delete: deleteIncome,
  edit: editIncome,
  update,
  findIncome,
}
// function Index - to create index
async function index(req, res) {
  try {
    // find incomes  and populale userId field
    let incomes = await Income.find({}).populate("userId")
    res.render("income/index", { title: "All Incomes, incomes " })
  } catch (error) {
    console.log("error fetching incomes:,", error)
  }
}

async function show(req, res) {
  try {
    // showing incomes byId  and populate userId field
    const income = await Income.findById(req.params.id).populate("id")
    if (!income) {
      return res.status(404).send("Income not found")
    }
    res.render("income/show", { title: "Income Details, income" })
  } catch (error) {
    console.error("Error fetching incomes details:,error")
  }
  //  function to render a form to add new Income
}
function newIncome(req, res) {
  res.render("income/new", { title: "Add Income", errorMsg: "" })
}
async function create(res, res) {
  try {
    // Create a new instance of the Income model using data from req.body
    const income = new income(req.body)
    if (income.name) {
      income.name = income.name.toUpperCase()
    }
    if (income.amount) {
      income.amount = income.amount.toString()
    }
    //adding authentication information to the req object for the user to be loggedIn
    income.user = req.user._id
    income.userName = req.user.name
    income.avatar = req.user.avatar
    // save income record to the db and wait for the operation
    const newIncome = await expense.save()
    console.log(newIncome)
    // redirect user to detailsPg to newly created income passing url
    res.redirect(`/income/${newIncome._id}`)
  } catch (error) {
    console.log("Error creating incomes", error)
  }
}
// function to find and search income byName
async function findIncome(req, res) {
  try {
    const searchQuery = req.query.search.toUpperCase()
    const sortQuery = req.query.sortBy
    let incomes
    // conditional check  to sort in ascending order
    if (searchQuery || sortQuery == "name") {
      incomes = await Income.find({
        name: { $regex: searchQuery },
      }).sort("name")
      // sort in descending order
    } else if (searchQuery || sortQuery == "-name") {
      incomes = await Income.find({
        name: { $regex, searchQuery },
      }).sort("name: -1")
    } else if (searchQuery || sortBy == "amount") {
      incomes = await Income.find({
        amounts: { $regex: searchQuery },
      }).sort("amount")
    } else if (searchQuery || sortQuery == "-amount") {
      amounts = await Amount.find({
        amount: { $regex, searchQuery },
      }).sort("amount: -1")
    } else {
      incomes = await Income.find()
    }
    res.render("incomes/index.ejs", { incomes: incomes })
  } catch (error) {
    console.log("Error searching incomes", errror)
  }
}
async function deleteIncome(req, res) {
  const Income = await Income.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  })
  res.redirect("/incomes")
}
async function editIncome(req, res) {
  console.log(req.params.id)
  const Income = await Income.findById(req.params.id)
  console.log(income)
  // pass income object to edit view for rendering
  res.render("incomes/edit", {
    income,
  })
}
async function update(req, res) {
  const incomeId = req.params.id
  const updateIncome = req.body
  console.log(updateIncome)
  await Income.findByIdAndUpadate(incomeId, updateIncome)
  res.redirect(`/income/${incomeId}`)
}

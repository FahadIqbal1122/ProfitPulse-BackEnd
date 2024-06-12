const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const AuthRouter = require("./routes/AuthRouter")
const IncomeRouter = require("./routes/Incomes")
const ExpenseRouter = require("./routes/Expenses")
const BudgetRouter = require("./routes/Budgets")

const PORT = process.env.PORT || 3001

const db = require("./db")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/auth", AuthRouter)
app.use("/expense", ExpenseRouter)

app.use("/", (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})

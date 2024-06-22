const { User, Budget, Income, Expense } = require("../models")
const axios = require("axios")
require("dotenv").config()
const mongoose = require("mongoose")
const edenApi = process.env.EDEN_API_KEY

async function GetMoneySavingTips(req, res) {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).send("User not found")
    }

    const incomes = await Income.find({ userId })
    const expenses = await Expense.find({ userId })
    const budgets = await Budget.find({ userId })
    const { name, totalIncome, totalExpense } = user

    const summary = `**Financial Summary**
            - User: ${name}
            - Total Income: $${totalIncome}
            - Total Expense: $${totalExpense}
            - Income Sources: ${incomes
        .map(
          (income) => `Income Name: ${income.name}. Amount: ${income.amount} `
        )
        .join(", ")}
            - Expense Categories: ${expenses
        .map(
          (expense) =>
            `Expense Note: ${expense.note}. Amount: ${expense.amount} `
        )
        .join(", ")}
            - Budgets: ${budgets
        .map(
          (budget) => `Budget Name: ${budget.name}. Amount: ${Budget.amount} `
        )
        .join(", ")}`

    const prompt = `${summary}
    
            Based on this information, can you suggest some money-saving tips for ${name}?`

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWVkOTgxYzgtMmNkYy00ZjZkLTk4ZjctNmM5Yzc3ZjhhZWU5IiwidHlwZSI6ImFwaV90b2tlbiJ9.jbb8xhYwvs0JPaQwu5lx9Oy0BNnDDNHXQhXLt42yjoA",
      },
      data: {
        providers: "cohere",
        text: prompt,
        temperature: 0.2,
        max_tokens: 250,
      },
    }

    axios
      .request(options)
      .then((response) => {
        console.log(response.data)
        res.send(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.error("Error fetching money-saving tips:", error)
    return { error: "Internal Server Error" }
  }
}

const GetFinances = async (req, res) => {
  try {
    const userId = req.params.userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: "Invalid user ID" })
    }
    const validUserId = new mongoose.Types.ObjectId(userId)

    const user = await User.findById(validUserId)
    const incomes = await Income.find({ userId: userId })
    const expenses = await Expense.find({ userId: userId })
    const budgets = await Budget.find({ userId: userId })
    res.send({
      user,
      incomes,
      expenses,
      budgets,
    })
  } catch (error) {
    console.error("Error fetching Finnances:", error)
  }
}

module.exports = {
  GetFinances,
  GetMoneySavingTips,
}

const { User, Budget, Income, Expense } = require("../models")
const { Configuration, OpenAIApi } = require("openai")
const axios = require("axios")
const puppeteer = require("puppeteer")
const solver = require("@2captcha/captcha-solver")
require("dotenv").config()

const apiKey = process.env.OPENAI_API_KEY

const GetFinances = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
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
// Credits for OpenAi API Documentation: https://platform.openai.com/docs/api-reference/introduction
// Credits for How To Use OpenAI API With Axios And JavaScript: https://www.codingthesmartway.com/how-to-use-openai-api-with-axios/
const GetMoneySavingTips = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    console.log("User:", user)

    if (!user) {
      return res.status(404).send("User not found")
    }

    const incomes = await Income.find({ userId })
    const expenses = await Expense.find({ userId })
    const budgets = await Budget.find({ userId })
    console.log(incomes)
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

    const response = await axios.post(
      "https://platform.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    )
    const tips = response.data.choices[0].text.trim()
    res.send({ tips })
    console.log({ tips })
  } catch (error) {
    console.error("Error fetching money-saving tips:", error)
  }
}

module.exports = {
  GetFinances,
  GetMoneySavingTips,
}
const { User, Budget, Income, Expense } = require("../models")
require("dotenv").config()
const mongoose = require("mongoose")
const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

console.log("GROQ KEY EXISTS:", !!process.env.GROQ_API_KEY)

 
async function GetMoneySavingTips(req, res) {
  try {
    const userId = req.params.userId
     if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: "Invalid user ID" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).send("User not found")
    }

    const incomes = await Income.find({ userId })
    const expenses = await Expense.find({ userId })
    const budgets = await Budget.find({ userId })
    const { name, totalIncome, totalExpense } = user

    const summary = `Financial Summary**
            - User: ${name}
            - Total Income: $${totalIncome}
            - Total Expense: $${totalExpense}
            - Income Sources: ${incomes
        .map((income) => `- ${income.name}: ${income.amount}`).join("\n")}
            - Expense Categories: ${expenses
        .map((expense) => `- ${expense.note}: ${expense.amount}`).join("\n")}

            - Budgets:Budgets:
${budgets
  .map(
    (budget) =>
      `- ${budget.name}: Limit ${budget.limit}, Spent ${budget.amount}, Remaining ${
        budget.limit - budget.amount
      }`
  )
  .join("\n")}

  `

    const prompt = `
${summary}

Based on this financial information for ${name},
suggest 5 personalized money-saving tips.

Mention specific budgets, expenses, and income data when relevant.
Keep the advice practical and realistic.
`

    // const options = {
    //   method: "POST",
    //   url: "https://api.edenai.run/v2/text/generation",
    //   // headers: {
    //   //   authorization:
    //   //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWVkOTgxYzgtMmNkYy00ZjZkLTk4ZjctNmM5Yzc3ZjhhZWU5IiwidHlwZSI6ImFwaV90b2tlbiJ9.jbb8xhYwvs0JPaQwu5lx9Oy0BNnDDNHXQhXLt42yjoA",
    //   // },
    //    headers: {
    //     authorization: `Bearer ${edenApi}`,
    //   },
    //   data: {
    //     providers: "cohere",
    //     text: prompt,
    //     temperature: 0.2,
    //     max_tokens: 250,
    //   },
    // }
const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content:
        "You are a helpful financial assistant. Give simple money-saving tips."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  temperature: 0.2,
  max_tokens: 500
})
  

const aiText = completion.choices[0].message.content

return res.status(200).send({
  cohere: {
    generated_text: aiText
  },
})
  } catch (error) {
    console.error("Error fetching money-saving tips:", error.message)

    return res.status(500).send({
      error: "Failed to generate money-saving tips",
    })
  }
}
 

//         const response = await axios.request(options)

//     return res.status(200).send(response.data)
//   } catch (error) {
//     console.error("Error fetching money-saving tips:", error.response?.data || error.message)
//     return res.status(500).send({ error: "Internal Server Error" })
//   }
// }


//     axios
//       .request(options)
//       .then((response) => {
//         console.log(response.data)
//         res.send(response.data)
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   } catch (error) {
//     console.error("Error fetching money-saving tips:", error)
//     return { error: "Internal Server Error" }
//   }
// }

const GetFinances = async (req, res) => {
  try {
    const userId = req.params.userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: "Invalid user ID" })
    }
    const validUserId = new mongoose.Types.ObjectId(userId)

    const user = await User.findById(validUserId)
       if (!user) {
      return res.status(404).send({ error: "User not found" })
    }
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

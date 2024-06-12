const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String },
    totalIncome: { type: Number },
    totalExpense: { type: Number },
  },
  { timestamps: true }
)

module.exports = userSchema

const { Schema } = require('mongoose')

const ExpenseSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  income: { type: Schema.Types.ObjectId, ref: 'Income' },
  budget: { type: Schema.Types.ObjectId, ref: 'Budget' }
})

module.exports = ExpenseSchema

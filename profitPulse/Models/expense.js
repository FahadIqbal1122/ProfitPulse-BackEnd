const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  income: { type: Schema.Types.Number, ref: 'Income' },
  budget: { type: Schema.Types.Number, ref: 'Budget' }
})

module.exports = mongoose.model('Expense', expenseSchema)

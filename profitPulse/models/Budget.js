const { Schema } = require("mongoose")

const budgetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = budgetSchema

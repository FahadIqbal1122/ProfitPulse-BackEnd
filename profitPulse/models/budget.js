const mongoose = require("mongoose")

const Schema = mongoose.Schema

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

module.exports = mongoose.model("Budget", budgetSchema)

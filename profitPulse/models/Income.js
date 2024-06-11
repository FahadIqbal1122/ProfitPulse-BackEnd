const mongoose = require("mongoose")

const Schema = mongoose.Schema

const incomeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Income", incomeSchema)

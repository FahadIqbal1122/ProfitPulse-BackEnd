const router = require("express").Router()
const controller = require("../controllers/Expenses")

router.get("/", controller.GetExpense)
router.post("/", controller.CreateExpense)

module.exports = router

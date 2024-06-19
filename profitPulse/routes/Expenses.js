const router = require("express").Router()
const controller = require("../controllers/Expenses")

router.get("/:userId", controller.GetExpenses)
router.post("/", controller.CreateExpense)
router.put("/:expense_id", controller.UpdateExpense)
router.delete("/:expense_id", controller.DeleteExpense)

module.exports = router

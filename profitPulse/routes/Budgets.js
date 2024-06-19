const router = require("express").Router()
const budgetsCtrl = require("../controllers/Budgets")

router.get("/:userId", budgetsCtrl.getBudget)

router.post("/", budgetsCtrl.create)

router.put("/:budget_id", budgetsCtrl.update)

router.delete("/:budgetsId", budgetsCtrl.delete)

module.exports = router

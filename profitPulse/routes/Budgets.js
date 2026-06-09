const router = require("express").Router()
const budgetsCtrl = require("../controllers/Budgets")

router.get("/:userId", budgetsCtrl.getBudget)

router.post("/", budgetsCtrl.create)

router.put("/:id", budgetsCtrl.update)

router.delete("/:id", budgetsCtrl.delete)

module.exports = router

const router = require("express").Router()
const budgetsCtrl = require("../controllers/Budgets")

router.get("/", budgetsCtrl.getBudget)

router.post("/", budgetsCtrl.create)

router.put("/:budgestId", budgetsCtrl.update)

router.delete("/:budgetsId", budgetsCtrl.delete)

module.exports = router

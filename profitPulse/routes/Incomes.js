const router = require("express").Router()
const incomeCtrl = require("../controllers/Incomes")

router.get("/", incomeCtrl.GetIncome)

router.post("/", incomeCtrl.createIncome)

router.put("/:income_id", incomeCtrl.updateIncome)

router.delete("/:income_id", incomeCtrl.deleteIncome)

module.exports = router

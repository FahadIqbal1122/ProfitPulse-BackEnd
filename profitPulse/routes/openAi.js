const router = require("express").Router()
const AiCtrl = require("../controllers/openAi")

router.get("/:userId", AiCtrl.GetFinances)

router.get("/:userId/money-saving-tips", AiCtrl.GetMoneySavingTips)

module.exports = router

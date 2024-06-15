const router = require("express").Router()
const AiCtrl = require("../controllers/openAi")
// Credits for Proxy Middleware: https://create-react-app.dev/docs/proxying-api-requests-in-development/
const { createProxyMiddleware } = require("http-proxy-middleware")

router.get("/:userId", AiCtrl.GetFinances)

router.get(
  "/:userId/money-saving-tips",

  createProxyMiddleware({
    target: "https://platform.openai.com/v1/completions",
    changeOrigin: true,
  }),
  AiCtrl.GetMoneySavingTips
)

module.exports = router

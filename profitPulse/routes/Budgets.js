const router = require('express').Router()
const budgetsCtrl = require('../controllers/Budgets')

router.get('/', budgetsCtrl.getBudget)

router.post('/', budgetsCtrl.create)

router.put('/:budget_id', budgetsCtrl.update)

router.delete('/:budget_id', budgetsCtrl.delete)

module.exports = router

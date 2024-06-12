const budgetsCtrl = require('../controllers/Budgets')

router.post('/budgets/:id', budgetsCtrl.create)

router.put('/budgets/:budgestId', budgetsCtrl.update)

router.delete('/budgets/:budgetsId', budgetsCtrl.delete)

module.exports = router

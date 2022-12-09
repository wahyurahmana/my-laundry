const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController.js')
const authentication = require('../middlewares/authentication.js')

router.get('/',authentication, CustomerController.allDataLaundry)
router.post('/',authentication, CustomerController.orderLaundry)

module.exports = router
const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const dataLaundry = require('./dataLaundry.js')
const customer = require('./customer.js')

router.get('/', (req, res, next) => res.status(200).json({message : "APP"}))
router.post('/login', UserController.login)
router.use('/data-laundry', dataLaundry)

router.use('/customer', customer)
module.exports = router
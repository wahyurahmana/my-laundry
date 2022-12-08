const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const dataLaundry = require('./dataLaundry.js')

router.get('/', (req, res, next) => res.status(200).json({message : "APP"}))
router.post('/login', UserController.login)
router.use('/data-laundry', dataLaundry)

module.exports = router
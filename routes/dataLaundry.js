const router = require('express').Router()
const authentication = require('../middlewares/authentication.js')
const authorizationAdmin = require('../middlewares/authorizationAdmin.js')
const DataLaundryController = require('../controllers/DataLaundryController.js')

router.get('/', authentication, authorizationAdmin, DataLaundryController.dataLaundry)
router.post('/', authentication, authorizationAdmin, DataLaundryController.orderLaundry)
router.get('/jenis-laundry', authentication,authorizationAdmin, DataLaundryController.allJenisLaundry)
router.post('/jenis-laundry', authentication,authorizationAdmin, DataLaundryController.addJenisLaundry)
router.delete('/jenis-laundry/:idJenisLaundry', authentication,authorizationAdmin, DataLaundryController.destroyJenisLaundry)
router.put('/jenis-laundry/:idJenisLaundry', authentication,authorizationAdmin, DataLaundryController.updateJenisLaundry)

module.exports = router
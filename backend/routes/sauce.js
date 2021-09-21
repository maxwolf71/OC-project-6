const express = require('express')
const router = express.Router()

const saucesCtrl = require('../controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, saucesCtrl.createSauce)
router.get('/:id', auth, saucesCtrl.getOneSauce)
router.get('/', auth, saucesCtrl.getAllSauces)
router.put('/:id', auth, multer, saucesCtrl.modifySauce)
router.delete('/:id', auth, saucesCtrl.deleteSauce)

router.post('/:id/like', auth, saucesCtrl.rateSauce)

module.exports = router
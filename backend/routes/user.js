// Express router setup
const express = require('express') 
const router = express.Router()
// Import Controller
const userCtrl = require('../controllers/user')
const password = require('../middleware/password')

//Authenitification routes
router.post('/signup', password, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
<<<<<<< HEAD
const express  = require('express') 
const router   = express.Router()

=======
// Express router setup
const express = require('express') 
const router = express.Router()
// Import Controller
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d
const userCtrl = require('../controllers/user')
const password = require('../middleware/password')

//Authenitification routes
router.post('/signup', password, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
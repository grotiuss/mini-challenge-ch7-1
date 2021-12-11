var express = require('express');
var router = express.Router();

//Controller
const authController = require('../controllers/Auth')

router.get('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/register', authController.register)

router.post('/login', authController.loginPost)
router.post('/register', authController.registerPost)

module.exports = router;

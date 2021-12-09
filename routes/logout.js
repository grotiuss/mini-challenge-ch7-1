var express = require('express');
var router = express.Router();

//Controller
const logoutController = require('../controllers/Logout')


router.get('/', logoutController.index)

module.exports = router;

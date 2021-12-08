var express = require('express');
var router = express.Router();

//Controller
const loginController = require('../controllers/Login')


router.get('/', loginController.index)

module.exports = router;

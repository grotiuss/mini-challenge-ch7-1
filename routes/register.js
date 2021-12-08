var express = require('express');
var router = express.Router();

//Controller
const registerController = require('../controllers/Register')

router.get('/', registerController.index)

module.exports = router;

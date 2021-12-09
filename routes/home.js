var express = require('express');
const app = require('../app');
var router = express.Router();

//Controller
const homeController = require('../controllers/Home')

router.get('/', homeController.index)

module.exports = router;

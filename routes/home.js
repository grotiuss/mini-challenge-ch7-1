var express = require('express');
const app = require('../app');
var router = express.Router();

//Controller
const homeController = require('../controllers/Home')

router.get('/', homeController.index)
router.get('/test', homeController.test_counter_bulk)

module.exports = router;

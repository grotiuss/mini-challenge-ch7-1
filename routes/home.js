var express = require('express');
var router = express.Router();

//Controller
const homeController = require('../controllers/Home')
const testController = require('../controllers/Test')

//Middlewares
const restrict = require('../middlewares/restrict')

router.get('/', homeController.index)
router.get('/test', restrict, testController.loginResult)
router.get('/whoami', testController.whoami)
router.get('/fail', (req, res) => {
    console.log('lalala')
    res.send('Login failed')
})

module.exports = router;

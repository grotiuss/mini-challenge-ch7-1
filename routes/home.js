var express = require('express');
const app = require('../app');
var router = express.Router();

//Controller
const homeController = require('../controllers/Home')


router.use((req, res, next) => {
    console.log(req.user_session)
    next()
})

router.get('/', homeController.index)

module.exports = router;

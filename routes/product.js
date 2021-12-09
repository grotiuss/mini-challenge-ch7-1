var express = require('express');
const product = require('../controllers/Product');
var router = express.Router();

const { User, Product, Order, ProductCategory } = require('../models')

const productController = require('../controllers/Product')


router.get('/', productController.index);
router.get('/detail/:id', productController.detail)
router.get('/detail', productController.detailInvalid)
router.get('/create', productController.create)
router.get('/update/:id', productController.update)
router.get('/update', productController.updateInvalid)

router.get('/test', productController.getReviewTest)

router.post('/create', productController.createInput)
router.post('/update/:id', productController.updateInput)

module.exports = router;

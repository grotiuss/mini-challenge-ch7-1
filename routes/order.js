var express = require('express');
const product = require('../controllers/Product');
var router = express.Router();

const { User, Product, Order, ProductCategory } = require('../models')

const orderController = require('../controllers/Order')


router.get('/', orderController.index)
router.get('/create', orderController.create)
router.get('/add/:id', orderController.orderProduct)
router.get('/detail/:id', orderController.detail)
router.get('/detail', orderController.detailInvalid)
router.get('/update/done/:id', orderController.updateDone)
router.get('/update/cancel/:id', orderController.updateCancel)
router.get('/update', orderController.updateInvalid)
router.get('/update/done', orderController.updateInvalid)
router.get('/update/cancel', orderController.updateInvalid)
router.get('/delete/:id', orderController.delete)
router.get('/delete', orderController.updateInvalid)

router.post('/create', orderController.createInput)

module.exports = router;

var express = require('express');
const product = require('../controllers/Product');
var router = express.Router();

const { User, Product, Order, ProductCategory } = require('../models')

const reviewController = require('../controllers/Review')


router.get('/', reviewController.index);
router.get('/delete/:id', reviewController.delete);
router.get('/delete', reviewController.invalid);
router.get('/update/:id', reviewController.update);
router.get('/update', reviewController.invalid);
router.get('/create', reviewController.create);

router.post('/create', reviewController.createInput);
router.post('/update/:id', reviewController.updateInput);

module.exports = router;

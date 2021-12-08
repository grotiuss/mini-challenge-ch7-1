var express = require('express');
const product = require('../controllers/Product');
var router = express.Router();

const { User, Product, Order, ProductCategory } = require('../models')

const reviewController = require('../controllers/Review')


router.get('/', reviewController.index)
module.exports = router;

/**
 *  Home Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

var fs = require('fs');
const { User, Product, Order, ProductCategory } = require('../models')

const f = {
    test: () => {
        console.log('Test controller is acitive')
    },
    get_category: async() => {
        var result = await ProductCategory.findAll()
        return result
    },
    get_new_products: async() => {
        var result = await Product.findAll({ 
            include: ProductCategory ,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return result.slice(0,4)
    },
}

const home = {
    all: async() => {
        //do nothing
    },
    index: async(req, res) => {
        var data = {
            title: 'Home',
            categories: await f.get_category(),
            newProductList: await f.get_new_products()
        }
        try {
            res.render('home_view', data)
            // res.send(data.productList)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = home
/**
 *  Home Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

var fs = require('fs');
const { User, Product, Order, ProductCategory } = require('../models')

const navbarInformation = require('./api/navbarInformation')

const f = {
    test: () => {
        console.log('Test controller is acitive')
    },
    get_new_products: async() => {
        var result = await Product.findAll({ 
            include: ProductCategory ,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return result.slice(0,4)
    }
}

const main_component = async(req) => {
    return {
        title: 'Home',
        categories: await navbarInformation.get_category(),
        user_session: await navbarInformation.get_user_session(req.user_session.id)
    }
}

const home = {
    all: async() => {
        //do nothing
    },
    index: async(req, res) => {
        try {
            var data = await main_component(req)
            data.content = {
                newProductList: await f.get_new_products()
            }
            res.render('home_view', data)
            // res.status(200).json(data)
        } catch (error) {
            res.status(500).json(
                {msg: 'index method in homeController is error'}
            )
        }
    }
}

module.exports = home
/**
 *  Home Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

const res = require('express/lib/response');
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
    },
    product_count:async(productId) => {
        try {
            var result = await Order.findAll(
                {where: { product_id: productId }}
            )
            return result.length
        } catch (error) {
            return (
                {msg: 'product_count is error'}
            )
        }
    },
    get_counted_products: async() =>{
        const datas = await Product.findAll({
            include: [
                {
                    model: ProductCategory
                },
                {
                    model: Order,
                    where: { transaction_status: 'DONE' }
                }
            ]
        })
        var data_counted = datas.map( data => {
            return {
                id: data.id,
                title: data.title,
                category_id: data.category_id,
                category_name: data.ProductCategory.name,
                description: data.description,
                count: data.Orders.length
            }
        } )
        data_counted.sort((a,b) => {
            return (b.count - a.count)
        })
        return data_counted.slice(0, 4)
    }
}

const main_component = async(req) => {
    return {
        title: 'Home',
        categories: await navbarInformation.get_category(),
        user_session: await navbarInformation.get_user_session(req.user_session.id),
        order_count: await navbarInformation.get_order_count(req.user_session.id)
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
                newProductList: await f.get_new_products(),
                bestSellingProductList: await f.get_counted_products()
            }
            res.render('home_view', data)
            // res.status(200).json(data)
        } catch (error) {
            res.status(500).json(
                {msg: 'index method in homeController is error'}
            )
        }
    },
    test_counter: async(req, res) => {
        try {
            const data = {
                count: await navbarInformation.get_order_count(req.user_session.id)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(
                {msg: 'error test method in homeController'}
            )
        }
    },
    test_counter_bulk: async(req, res) => {
        try {
            const data_counted = await f.get_counted_products()

            res.status(200).json(data_counted)
        } catch (error) {
            res.status(500).json(
                { msg: 'error test_counter_model in homeController' }
            )
        }
    }
}

module.exports = home
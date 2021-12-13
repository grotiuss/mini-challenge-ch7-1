/**
 *  Product Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory, Review } = require('../models')
 const navbarInformation = require('./api/navbarInformation')

 const main_component = async(req) => {
    return {
        title: 'Products',  
        categories: await navbarInformation.get_category(),
        user_session: navbarInformation.get_user_session(req.user),
        order_count: await navbarInformation.get_order_count(req.user)
    }
}

 const f = {
     getReviews: async(productId) => {
         try {
             var result = await Review.findAll({
                 where: {
                     product_id: productId
                 },
                 order: [
                     ['rating', 'DESC']
                 ]
            })
             return result
         } catch (err) {
             return ({
                 msg: 'function error'
             })
         }
     }
 }
 
 const product = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {

        var data = await main_component(req)
        data.orders = await Product.findAll(
            { 
                include: ProductCategory,
                order: [['updatedAt', 'DESC']]
            }
        )
        res.render('product/product_main_view', data)
        //  res.status(200).json(data)
     },
     detail: async(req, res) => {
        var data = await main_component(req)
        data.content = await Product.findOne({ 
            include: ProductCategory,
            where: { id: req.params.id }
         })
        data.reviews = await f.getReviews(req.params.id)
        res.render('product/product_detail_view', data)
        // res.status(200).json(
        //     data.reviews
        // )
    },
    detailInvalid: (req, res) => {
        res.redirect('/product')
    },
    create: async(req, res) => {
        var data = await main_component(req)
        data.content = {
            productCategory: await ProductCategory.findAll()
        }
        res.render('product/product_create_view', data)
        // res.status(200).json(data)
        // res.status(200).json({ msg: 'Ini halaman product create' })
    },
    createInput: async(req, res) => {
        var input = {
            title: req.body.productName,
            category_id: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await Product.create(input)
            .then( () => {
                res.redirect('/')
            })
    },
    update: async(req, res) => {
        var data = await main_component(req)
        data.content = {
            detail: await Product.findOne({ include: ProductCategory, where: { id: req.params.id } }),
            productCategory: await ProductCategory.findAll()
        }
        // res.status(200).json(data.content)
        res.render('product/product_update_view', data)
    },
    updateInput: async(req, res) => {
        try {
            var input = {
                title: req.body.productName,
                category_id: req.body.category,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price,
                updatedAt: new Date()
            }
            await Product.update(input, { where: { id: req.params.id } })
                .then( () => {
                    res.redirect('/product/detail/' + req.params.id)
                })
            // res.status(200).json(input)
        } catch (err) {
            res.status(500).json(
                {msg: 'Terjadi error'}
            )
        }
    },
    updateInvalid: (req, res) => {
        res.redirect('/product')
    },
    getReviewTest: async(req, res) => {
        try {
            var result = await f.getReviews(1)
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(
                {msg: 'getReview test controller is error'}
            )
        }
    }
 }
 
 module.exports = product
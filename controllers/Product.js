/**
 *  Home Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory } = require('../models')
 const navbarInformation = require('./api/navbarInformation')

 const main_component = async() => {
     return {
        title: 'Products',
        categories: await navbarInformation.get_category()
     }
 }
 
 const product = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {

        var data = await main_component()
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
        var data = await main_component()
        data.content = await Product.findOne({ 
            include: ProductCategory,
            where: { id: req.params.id }
         })
        res.render('product/product_detail_view', data)
        // res.status(200).json(
        //     data.content
        // )
    },
    detailInvalid: (req, res) => {
        res.redirect('/product')
    },
    create: async(req, res) => {
        var data = await main_component()
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
        var data = await main_component()
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
    }
 }
 
 module.exports = product
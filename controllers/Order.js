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
        title: 'Orders',
        categories: await navbarInformation.get_category()
     }
 }

 const f = {
     total_price: async(productId, qty) => {
         try{
            var findProduct = await Product.findByPk(productId)
            const result = findProduct.price * qty
            return result
         } catch (err) {
            return 'f.total_price error'
         }
     }
 }
 
 const order = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {
         try {
             var data = await main_component()
             data.content = {
                 orders : await Order.findAll({
                     include: [
                         {model: Product},
                         {model: User}
                     ],
                     order: [
                         ['updatedAt', 'DESC']
                     ]
                 })
             }
             res.render('order/order_main_view', data)

            // res.status(200).json(data.content.orders)
         } catch (err) {
             res.status(500).json({
                msg: "Terjadi error",
                err: err
            })
         }
     },
     create: async(req, res) => {
         try{
             var data = await main_component()
             data.content = {
                 userList : await User.findAll(),
                 productList: await Product.findAll(),
             }
             res.render('order/order_create_view', data)
            //  res.status(200).json(
            //      data
            //  )
         } catch (err) {
            res.status(500).json(
                {
                    msg: 'Telah terjadi error',
                    err: err
                }
            )
         }
     },
     createInput: async (req, res) => {
        try {
            var input = {
                product_id: req.body.productId,
                user_id: req.body.userId,
                qty: req.body.qty,
                price: await f.total_price(req.body.productId,req.body.qty),
                transaction_status: 'WAITING',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await Order.create(input)
                .then( () => {
                    res.redirect('/order')
                })
            // res.status(200).json(input)
        } catch (err) {
            res.status(500).json({msg: 'Sedang terjadi error'})
        }
    },
    detail: async(req, res) => {
        try {
            const data = await main_component()
            const findOrder = await Order.findOne({
                where: {id: req.params.id},
                include: [
                    { 
                        model: Product,
                        include: [{model: ProductCategory}]
                    },
                    {model: User}
                ]
            })
            if (findOrder) {
                data.content = {
                    orderDetail: findOrder
                }
                // res.status(200).json(data.content.orderDetail)
                res.render('order/order_detail_view', data)
            } else {
                res.redirect('/order')
            }


        } catch (error) {
            res.status(500).json({msg: 'Router error'})
        }
    },
    detailInvalid: (req, res) => {
        res.redirect('/order')
    },
    updateInvalid: (req, res) => {
        res.redirect('/order')
    },
    updateDone: async(req, res) => {
        try {
            const orderFind = await Order.findByPk(req.params.id)
            if (orderFind && orderFind.transaction_status == 'WAITING') {
                var input = {
                    updatedAt: new Date(),
                    transaction_status: 'DONE'
                }
                await Order.update(input, { where: { id: req.params.id } })
            }
            res.redirect('/order')
        } catch (err) {
            res.status(500).json({msg: 'updateDone method error'})
        }
    },
    updateCancel: async(req, res) => {
        try{
            const orderFind = await Order.findByPk(req.params.id)
            if (orderFind && orderFind.transaction_status == 'WAITING') {
                var input = {
                    updatedAt: new Date(),
                    transaction_status: 'CANCELED'
                }
                await Order.update(input, { where: { id: req.params.id } })
            }
            res.redirect('/order')
        } catch (err) {
            res.status(500).json({msg: 'updateCancel method error'})
        }
    },
    delete: async(req, res) => {
        try{
            const orderFind = await Order.findByPk(req.params.id)
            if (orderFind && orderFind.transaction_status == 'CANCELED') {
                await Order.destroy({ where: { id: req.params.id } })
            }
            res.redirect('/order')
        } catch (err) {
            res.status(500).json({msg: 'delete method error'})
        }
    }
 }
 
 module.exports = order
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
 
 const review = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {
         try {
             res.status(200).json({msg: 'Ini halaman review'})
         } catch (err) {
             res.status(200).json({msg: 'reviewController error'})
         }
     }
     
 }
 
 module.exports = review
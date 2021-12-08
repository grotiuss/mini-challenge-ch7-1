/**
 *  Review Controller
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
 
 const review = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {
         try {
             var data = await main_component()
             res.render('review/review_main_view', data)
            //  res.status(200).json({msg: 'Ini halaman review'})
         } catch (err) {
             res.status(200).json({msg: 'reviewController error'})
         }
     }
     
 }
 
 module.exports = review
/**
 *  Login Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory } = require('../models')
 
 const f = {
     test: () => {
         console.log('Test controller is acitive')
     }
 }
 
 const logout = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {
         req.user_session.id = undefined
         res.redirect('/')
     }
 }
 
 module.exports = logout
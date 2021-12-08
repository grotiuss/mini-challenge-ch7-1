/**
 *  Home Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory } = require('../../models')
 
 const navbarInfo = {
     test: () => {
         console.log('Test controller is acitive')
     },
     get_category: async() => {
         var result = await ProductCategory.findAll()
         return result
     }
 }
 
 module.exports = navbarInfo
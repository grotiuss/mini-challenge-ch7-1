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
     },
     get_user_session: async(userId) => {
         try {
             if(!userId) {
                 return {
                     id: undefined,
                     username: undefined,
                     asAdmin: false
                 }
             }
             var result = await User.findOne({
                 where: { id: userId },
                 attributes: ['id', 'username', 'asAdmin']
             })
             return result

         } catch (error) {
             return {
                 msg: 'get_user_session method in navbarInformation is error'
             }
         }
     }
 }
 
 module.exports = navbarInfo
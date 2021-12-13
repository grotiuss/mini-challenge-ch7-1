/**
 *  Home Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 const res = require('express/lib/response');
 const { User, Product, Order, ProductCategory, user } = require('../../models')
 
 const navbarInfo = {
     test: () => {
         console.log('Test controller is acitive')
     },
     get_category: async() => {
         var result = await ProductCategory.findAll()
         return result
     },
     get_user_session: (user) => {
         try {
            if(!user) {
                return {
                    id: null,
                    username: null,
                    asAdmin: false
                }
            } else {
                return {
                    id: user.id,
                    username: user.username,
                    asAdmin: user.asAdmin
                }
            }
         } catch (error) {
             return {
                 msg: 'get_user_session method in navbarInformation is error'
             }
         }
     },
     get_order_count: async(user) => {
         try {
             if(!user) return 0
             const result = await Order.findAll({ 
                 where: { 
                     user_id: user.id,
                     transaction_status: 'WAITING'
                    } })
             return result.length
         } catch (error) {
             return {
                 msg: 'get_order_count method in navbarInformation (api) is error'
             }
         }
     }
 }
 
 module.exports = navbarInfo
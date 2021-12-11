/**
 *  Auth Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory } = require('../models')
 const navbarInformation = require('./api/navbarInformation')
 
 const f = {
     test: () => {
         console.log('Test controller is acitive')
     }
 }

 const main_component = async(req) => {
    return {
       title: 'Account',
       categories: await navbarInformation.get_category(),
       user_session: await navbarInformation.get_user_session(req.user_session.id),
       order_count: await navbarInformation.get_order_count(req.user_session.id)
    }
 }
 
 const auth = {
     all: async() => {
         //do nothing
     },
     logout: async(req, res) => {
         req.user_session.id = null
         res.redirect('/')
     },
     login: async(req, res) => {
         const data = await main_component(req)
         data.title = data.title + ' | Login'
         try {
             res.render('login_view', data)
             // res.send(data.productList)
         } catch (error) {
             res.status(500).json(
                 { msg: 'login method in AuthController is error' }
             )
         }
     },
     loginPost: async(req, res) => {
         try {
            var input = {
                username: req.body.username,
                password: req.body.password
             }
            var findUser = await User.findOne({
                where: { username: req.body.username }
            })

            if(findUser) {
                if(findUser.password == input.password) {
                    req.user_session.id = findUser.id
                    res.redirect('/')
                    // res.status(200).json(findUser)
                } else {
                    res.redirect('/auth/login')
                }
            } else {
                f.note = 'Login Failed'
                res.redirect('/auth/login')
            }
         } catch (error) {
             res.status(500).json({
                 msg: 'loginPost method in authController is error'
             })
         }
     },
     register: async(req, res) => {
        try {
            const data = await main_component(req)
            data.title = data.title + ' | Register'
            res.render('register_view', data)
            // res.send(data.productList)
        } catch (error) {
            res.send(error)
        }
    }
 }
 
 module.exports = auth
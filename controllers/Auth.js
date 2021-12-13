/**
 *  Auth Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory } = require('../models')
 const passport = require('../lib/passport')
 const navbarInformation = require('./api/navbarInformation')
 
 const main_component = async(req) => {
    return {
       title: 'Account',
       categories: await navbarInformation.get_category(),
    //    user_session: navbarInformation.get_user_session(req.dataValues),
    //    order_count: await navbarInformation.get_order_count(req.dataValues.id)
    }
 }
 
 const auth = {
     all: async() => {
         //do nothing
     },
     logout: async(req, res) => {
         req.logout()
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
     loginPost: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
     register: async(req, res) => {
        try {
            const data = await main_component(req)
            data.title = data.title + ' | Register'
            res.render('register_view', data)
            // res.send(data.productList)
        } catch (error) {
            res.send(error)
        }
    },
    registerPost: async(req, res) => {
        try {
            const input = {
                username : req.body.username,
                password : req.body.password,
            }
            await User.register({
                username: input.username,
                password: input.password
            })
                .then(() => {
                    res.redirect('/auth/login')
                })
        } catch (error){
            res.status(500).json(
                { msg: 'registerPost method in authContoller is error' }
            )
        }
    }
 }
 
 module.exports = auth
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
 
 const login = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {
         var data = {
             title: 'Login'
         }
         try {
             res.render('login_view', data)
             // res.send(data.productList)
         } catch (error) {
             res.send(error)
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
                    res.status(200).json(
                        {msg: 'Password yang anda masukkan salah'}
                    )
                }
            } else {
                res.status(400).json({
                    msg: 'Data tidak ditemukan'
                })
            }
         } catch (error) {
             res.status(500).json({
                 msg: 'loginPost error'
             })
         }
     }
 }
 
 module.exports = login
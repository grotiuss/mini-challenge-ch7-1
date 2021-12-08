/**
 *  Review Controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 */

 var fs = require('fs');
 const { User, Product, Order, ProductCategory, Review } = require('../models')
 const navbarInformation = require('./api/navbarInformation')

 const main_component = async() => {
     return {
        title: 'Reviews',
        categories: await navbarInformation.get_category()
     }
 }
 
 const f = {
    // for handling missing column error on Review Model :( 
    reviewColumns : ['id', 'product_id', 'rating', 'review', 'createdAt', 'updatedAt']
}
 
 const review = {
     all: async() => {
         //do nothing
     },
     index: async(req, res) => {
         try{
             var data = await main_component()
             data.content = {
                reviews: await Review.findAll({
                    attributes: f.reviewColumns,
                    include: [
                        {model: Product}
                    ],
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                })
             }
             res.render('review/review_main_view', data)
            // res.status(200).json(data.content.reviews)
         } catch (err) {
             res.status(500).json(
                 {msg: 'reviewController error'}
             )
         }
     },
     invalid: (req, res) => {
         res.redirect('/review')
     },
     delete: async(req, res) => {
         try { 
             const findReview = await Review.findOne({
                 where: { id: req.params.id },
                 attributes: f.reviewColumns
             })
             if(findReview) {
                 await Review.destroy({ where: { id: req.params.id } })
             }
             res.redirect('/review')
            //  res.status(200).json(findReview)
         } catch( err ) {
             res.status(500).json(
                 {msg: 'delete method in reviewController is error'}
             )
         }
     },
     create: async(req, res) => {
        try {
            var data = await main_component()
            data.content = {
                productList: await Product.findAll()
            }
            res.render('review/review_create_view', data)
        } catch (err) {
            res.status(500).json(
                {msg: 'create method in reviewController is error'}
            )
        }
     },
     createInput: async(req, res) => {
         try {
             var input = {
                 product_id: req.body.productId,
                 rating: req.body.rating,
                 review: req.body.review,
                 createdAt: new Date,
                 updatedAt: new Date,
                 ProductId: 1
             }
             await Review.create(input)
             res.redirect('/review')
             
            //  res.status(200).json(input)
         } catch (err) {
             res.status(500).json(
                 {msg: 'createInput method in reviewController is error'}
             )
         }
     },
     update: async(req, res) => {
         try {
             var data = await main_component()
             var findReview = await Review.findOne({
                where: { id: req.params.id },
                include: {model: Product},
                attributes: f.reviewColumns
             })

             if(findReview) {
                 data.content = {
                     detail: findReview
                 }
                 res.render('review/review_update_view', data)
                //  res.status(200).json(data.content.detail)
             } else {
                 res.redirect('/review')
             }
             
         } catch(err) {
             res.status(500).json(
                 {msg: 'Update method error'}
             )
         }
     },
     updateInput: async(req, res) => {
         try {
             var input = {
                 rating: req.body.rating,
                 review: req.body.review,
                 updatedAt: new Date()
             }
             await Review.update(input, { where: { id: req.params.id }})
                .then(() =>{
                    res.redirect('/review')
                })
         } catch (error) {
             res.status(500).json(
                 {msg: 'updateInput method in review controller is error'}
             )

         }
     }
 }
 
 module.exports = review
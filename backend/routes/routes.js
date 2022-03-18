'use strict'

const express = require ('express')


const api = express.Router()
const userCtrl = require ('../controllers/users')
const imagesCtrl = require ('../controllers/images')
const auth = require('../middlewares/auth')
const multer = require("multer");
const images = require('../models/images')

api.get('/private', auth, function(req,res){
    res.status(200).send({message:'Tienes acceso'})
})
api.post('/signup', userCtrl.signup)
api.post('/signin', userCtrl.signin)
api.put('/update', userCtrl.updateUser)
api.delete('/down', userCtrl.deleteStuff)
api.post('/getcheckboxes', userCtrl.getCheckBoxes)






const storage = multer.diskStorage({
    /* destination:'../practica/frontend/src/assets/uploads/', */
    destination:'C:/Users/campesino/Documents/practica/frontend/src/assets/uploads/',
    filename: function(req,file,cb){
        cb(null, Date.now()+'.'+file.mimetype.split('/')[1])
    }
    
})

const upload = multer({storage: storage})

api.post('/up', upload.single("photo"),userCtrl.updatePicture)//user
api.post("/upload", upload.single("photo"), imagesCtrl.saveImages)
api.get('/bring', imagesCtrl.showImages)
api.delete('/removeimg', imagesCtrl.deleteImage)





//=========================================================COMMENTS

const commentCtrl = require ('../controllers/comments')

api.post('/savecomment', commentCtrl.saveComment)
api.post('/findcomments', commentCtrl.findComments)
api.post('/find5lastcomments', commentCtrl.find5LastComments)
api.delete('/deletecomment', commentCtrl.deleteComment)




//==========================================================RATINGS

const ratingCtrl = require ('../controllers/ratings')

api.post('/saverating', ratingCtrl.saveRating)
api.post('/findrating', ratingCtrl.findRating)
api.delete('/deleterating', ratingCtrl.deleteRating)
api.post('/find5lastratings', ratingCtrl.find5LastRatings)


//==========================================================FAVORITES

const favoriteCtrl = require ('../controllers/favorites')

api.post('/savefavorite', favoriteCtrl.saveFavorite)
api.post('/findfavorites', favoriteCtrl.findFavorites)


//==========================================================REVIEWS

const reviewsCtrl = require('../controllers/reviews')

api.post('/savereview', reviewsCtrl.saveReview)
api.post('/findreviews', reviewsCtrl.findReviews)
api.delete('/deletereview', reviewsCtrl.deleteReview)



//==========================================================RATINGREVIEWS

const ratingReviews = require('../controllers/ratingreviews')

api.post('/saveratingreview', ratingReviews.saveRatingReview)
api.post('/findratingreview', ratingReviews.findRatingReview)
api.post('/findratingreviewpersonal', ratingReviews.findRatingReviewPersonal)
api.delete('/deleteratingreview', ratingReviews.deleteRatingReview)




module.exports = api


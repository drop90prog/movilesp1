const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    idmovie: Number,
    moviename: String,
    iduser: String,
    username: String,
    review: String,

})


module.exports = mongoose.model('reviews', UserSchema)
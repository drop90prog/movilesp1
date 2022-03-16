const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({

    iduser: String,
    username: String,
    idmovie: String,
    moviename: String,   
})


module.exports = mongoose.model('favorites', UserSchema)


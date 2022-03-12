const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    idmovie: Number,
    iduser: String,
    comment: String,
    username: String,
})


module.exports = mongoose.model('comments', UserSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    originalname: String,
    filename: String,
    path: String,
    pathupload: String,
    admin: Boolean,    
})


module.exports = mongoose.model('images', UserSchema)
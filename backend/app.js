'use strict'

const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
const api = require('./routes/routes')
const cors = require('cors')
const morgan = require("morgan");

app.use(express.urlencoded({ extended:false}))
app.use(express.json())
/* app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json()) */
app.use(morgan("combined"));

app.use(cors({
    origin: true
}));

app.use('', api)

module.exports = app

/* 'use strict'

const mongoose = require('mongoose')
const config = require('./config')

const app = require('./app')

mongoose.connect(config.dd, (err,res)=>{
    if(err) return console.log(`Error al conectar con la base de datos ${err}`)
    console.log('conexion establecida...')

    app.listen(config.port, ()=>{
        console.log('server ON')
    })
})
 */




'use strict'

const mongoose = require('mongoose')
const config = require('./config')

const app = require('./app')

const connectDB = async () => {
    await mongoose.connect(config.db, (err,res)=>{
        if(err) return console.log(`Error al conectar con la base de datos ${err}`)
        console.log('conexion establecida...')
    
        app.listen(config.port, ()=>{
            console.log(`server ON en el puerto ${config.port}`)
        })
    })
}

connectDB()





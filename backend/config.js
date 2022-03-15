module.exports = {
    port: process.env.PORT || 3000,  
    db: process.env.MONGODB || 'mongodb://localhost:27017/dbname',    
    
    /* db: process.env.MONGODB || 'mongodb+srv://proyecto:proyecto@cluster0.t6bao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', */
    SECRET_TOKEN: 'topocho'
}
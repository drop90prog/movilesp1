const Review = require('../models/reviews')




function saveReview(req, res){

    const critica = new Review({
        idmovie: req.body.idmovie,
        moviename: req.body.moviename,
        iduser: req.body.iduser,
        username: req.body.username,
        review: req.body.review,
        rate: 0
    })        
    critica.save((err)=>{
        if(err)return res.status(500).send({message:`Error ${err}`})
        return res.status(200).send({message:"done"})
    })

}//function saveComment


             
function findReviews(req, res){
    Review.find({idmovie: req.body.idmovie}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result.length>0){
            return res.status(200).send({resultado:result})
        } 
        if(result.length==0){
            return res.status(404).send({resultado:result})
        } 
        
    })//Review.find
}






module.exports = {
    saveReview,
    findReviews,
}




const Review = require('../models/reviews')




function saveReview(req, res){


    Review.findOne({idmovie: req.body.idmovie, iduser: req.body.iduser}, (err,result)=>{

 
        if(result){         console.log(result)   
            return res.status(404).send({message:"Only 1 review allowed per movie"})
        }

        if(!result){
            const critica = new Review({
                idmovie: req.body.idmovie,
                moviename: req.body.moviename,
                iduser: req.body.iduser,
                username: req.body.username,
                review: req.body.review,
            })        
            critica.save((err)=>{
                if(err)return res.status(500).send({message:`Error ${err}`})
                return res.status(200).send({message:"done"})
            })
        }

        if(err){            
            return res.status(404).send({message:err})
        }

    })












/*     const critica = new Review({
        idmovie: req.body.idmovie,
        moviename: req.body.moviename,
        iduser: req.body.iduser,
        username: req.body.username,
        review: req.body.review,
    })        
    critica.save((err)=>{
        if(err)return res.status(500).send({message:`Error ${err}`})
        return res.status(200).send({message:"done"})
    }) */

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



function deleteReview (req,res) {
      

    Review.findByIdAndDelete({_id: req.body.idreview} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}




module.exports = {
    saveReview,
    findReviews,
    deleteReview
}




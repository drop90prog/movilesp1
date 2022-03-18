const RatingReview = require('../models/ratingReviews')




function saveRatingReview(req, res){


    RatingReview.findOne({idmovie: req.body.idmovie, iduser: req.body.iduser, iduserreviewer: req.body.iduserreviewer}, (err,result)=>{

 
        if(result){         console.log(result)   
            return res.status(200).send({message:"Only 1 vote allowed"})
        }

        if(!result){       
            const ratingrev = new RatingReview({        
                idmovie: req.body.idmovie,
                moviename: req.body.moviename,
                iduser: req.body.iduser,//mi id(el que vota al review del reviewer)
                username: req.body.username,
                iduserreviewer: req.body.iduserreviewer,//id del critico, a quien yo le vote
                rate: req.body.rate,
            })        
            ratingrev.save((err)=>{
                if(err)return res.status(500).send({message:`Error ${err}`})
                return res.status(200).send({message:"done"})
            })
        }

        if(err){            
            return res.status(404).send({message:err})
        }

    })//findone


}//function saveRating


function findRatingReview(req, res){
    RatingReview.find({idmovie: req.body.idmovie}, (err,result)=>{

        if(err)return res.status(404).send({
            message:err            
        }) 
        if(result.length>0){
            return res.status(200).send({resultado:result})
        } 
        if(result.length==0){
            return res.status(404).send({resultado:result})
        } 
        
    })//Rating.find
}



function findRatingReviewPersonal(req, res){
    RatingReview.find({idmovie: req.body.idmovie, iduser: req.body.iduser}, (err,result)=>{

        if(err)return res.status(404).send({
            message:err            
        }) 
        if(result.length>0){
            return res.status(200).send({resultado:result})
        } 
        if(result.length==0){
            return res.status(404).send({resultado:result})
        } 
        
    })//Rating.find
}





function deleteRatingReview (req,res) {   


    RatingReview.findOneAndDelete({iduser: req.body.iduser, idmovie:req.body.idmovie, iduserreviewer: req.body.iduserreviewer} , (err, rating)=>{
        if(err)return res.status(500).send({message: err}) 
        if(rating)res.status(200).send({message:'Successfully deleted'})
        if(!rating)res.status(200).send({message:'no rated by current user apparently'})
    })    
}




module.exports = {
    saveRatingReview,
    findRatingReview,
    deleteRatingReview,    
    findRatingReviewPersonal,
}




const Rating = require('../models/ratings')




function saveRating(req, res){


    Rating.findOne({idmovie: req.body.idmovie, iduser: req.body.iduser}, (err,result)=>{
        if(result){
            
            return res.status(200).send({message:"Only 1 vote allowed"})
        }

        if(!result){       

            const rating = new Rating({
        
                idmovie: req.body.idmovie,
                moviename: req.body.moviename,
                iduser: req.body.iduser,
                username: req.body.username,
                rate: req.body.rate,
        
            })        
            rating.save((err)=>{
                if(err)return res.status(500).send({message:`Error ${err}`})
                return res.status(200).send({message:"done"})
            })


        }

    })


}//function saveRating


             
function findRating(req, res){
    Rating.find({idmovie: req.body.idmovie}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result){
            return res.status(200).send({resultado:result})
        } 
        
    })//Rating.find
}


function find5LastRatings(req, res){

    Rating.find({iduser: req.body.iduser}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result){
            return res.status(200).send({resultado:result})
        } 
        
    })//Rating.find
}


function deleteRating (req,res) {
      

    Rating.findOneAndDelete({iduser: req.body.iduser, idmovie:req.body.idmovie} , (err, rating)=>{
        if(err)return res.status(500).send({message: err}) 
        if(rating)res.status(200).send({message:'Successfully deleted'})
    })    
}




module.exports = {
    saveRating,
    findRating,
    deleteRating,
    find5LastRatings
    
}




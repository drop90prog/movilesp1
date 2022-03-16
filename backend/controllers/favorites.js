const Favorites = require('../models/favorites')




function saveFavorite(req, res){


    Favorites.findOneAndDelete({iduser: req.body.iduser, idmovie:req.body.idmovie} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)return res.status(200).send({message:'Successfully removed'})
        if(!result){
            const favorite = new Favorites({
        
                idmovie: req.body.idmovie,
                moviename: req.body.moviename,
                iduser: req.body.iduser,
                username: req.body.username,        
            })        
            favorite.save((err)=>{
                if(err)return res.status(500).send({message:`Error ${err}`})
                return res.status(200).send({message:"Added to favorites"})
            })
        }
    })

}//function saveRating

             


function findFavorites(req, res){

    //muestra el favorito de una pelicula especidifa(para saber si el user dio like a una
    //pelicula en particular)
    if(req.body.iduser && req.body.idmovie){
    Favorites.find({iduser: req.body.iduser, idmovie: req.body.idmovie}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  
        if(result.length==0){
        return res.status(404).send({message:"not found"})
    }

        if(result.length>0){ 
            return res.status(200).send({message:"found it"})
        }

        
    })//Rating.find
    }//if

    //todos favoritos de un usuario especifico
    else{Favorites.find({iduser: req.body.iduser}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result.length>0){
            return res.status(200).send({resultado:result})
        }
        if(result.length==0){
            return res.status(404).send({message:"not found"})
        }
        
    })//Rating.find
    }//else



}


function find5LastRatings(req, res){

    Favorites.find({iduser: req.body.iduser}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result){
            return res.status(200).send({resultado:result})
        } 
        
    })//Rating.find
}


function deleteRating (req,res) {
    console.log(req.body.id)   

    Rating.findOneAndDelete({iduser: req.body.iduser, idmovie:req.body.idmovie} , (err, rating)=>{
        if(err)return res.status(500).send({message: err}) 
        if(rating)res.status(200).send({message:'Successfully deleted'})
    })    
}




module.exports = {
    saveFavorite,
    findFavorites
    
}




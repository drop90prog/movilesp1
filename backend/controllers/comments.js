const Comment = require('../models/comments')




function saveComment(req, res){   

    console.log(req.body)

    const komentario = new Comment({
        idmovie: req.body.idmovie,
        moviename: req.body.moviename,
        iduser: req.body.iduser,
        comment: req.body.comment,
        username: req.body.username,
    })        
    komentario.save((err)=>{
        if(err)return res.status(500).send({message:`Error ${err}`})
        return res.status(200).send({message:"done"})
    })

}//function saveComment


             
function findComments(req, res){
    Comment.find({idmovie: req.body.idmovie}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result){
            return res.status(200).send({resultado:result})
        } 
        
    })//Comment.find
}


function find5LastComments(req, res){

    
    Comment.find({iduser: req.body.iduser}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result){
            return res.status(200).send({resultado:result})
        } 
        
    })//Comment.find
}


function deleteComment (req,res) {
      

    Comment.findByIdAndDelete({_id: req.body.idcomment} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}





module.exports = {
    saveComment,
    findComments,
    find5LastComments,
    deleteComment,
}




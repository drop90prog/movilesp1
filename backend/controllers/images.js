
const Imagee = require('../models/images')
const service = require('../services')
const config = require('../config')



function saveImages (req, res) {
    console.log(req.file);

    const images = new Imagee({
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        pathupload: "../../assets/uploads/"+req.file.filename,
        admin: req.body.admin,
    })

    images.save((err)=>{
        if(err)res.status(500).send({message:`Error ${err}`})
        res.status(200).send({originalname:req.file.originalname,filename:req.file.filename,message:"Done"})
    })    
  };



  function showImages (req, res) {
    
    Imagee.find({},(err,result)=>{
            console.log(result)
            if(err)return res.status(500).send({message:`Error ${err}`})
            if(result.length==0) return res.status(404).send({message:"no"})
            if(result)return res.status(200).send({result})
        })    
       
  };


  function deleteImage (req,res) {
    console.log(req.body.name)
    Imagee.findOneAndDelete({filename:req.body.name}, (err)=>{
        if(err)return res.status(500).send({message: err}) 
        return res.status(200).send({message:'Successfully deleted'})
    })
    
}



module.exports = {
    saveImages,
    showImages,
    deleteImage
}
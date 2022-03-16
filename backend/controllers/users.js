'use strict'
const Imagee = require('../models/images')
const mongoose = require('mongoose')
const User = require('../models/users')
const service = require('../services')
const config = require('../config')
const formidable = require('formidable');

function signup (req, res) {
    if(!req.body.name || !req.body.email || !req.body.password) return res.status(401).send({message: "Please fill the fields"})
    else{const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        showLastFavorites: false,
        showLastComments: false,
        showLastRatings: false, 
        avatar: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
    })


        user.save((err)=>{
            if(err)res.status(500).send({message:`Error ${err}`})
            return res.status(200).send({message:"New user created"})
        })
    }//else
}


function signin (req, res) {
    if(!req.body.email || !req.body.password) return res.status(401).send({message: "Please fill the fields"})
    else {console.log(req.body)

    User.findOne({email: req.body.email}, (err, user)=> {
        if(err || !user) return res.status(500).send({message: "Email or password wrong"})
        else{console.log("user: "+user)
            return res.status(200).send({
                message:'Logged in successfully',
                token: service.createToken(user)
            })
        }        
        
    })//user.findOne  
    }//else
} 




 function updatePicture (req, res) {
     
     console.log(req.file.filename)
     console.log(req.body.id)

/*      const form = formidable({ multiples: true });
         form.parse(req, (err, fields, files) => {
         console.log('fields: ', fields);
         console.log('files: ', files);  
         res.send({ success: true });  
        })//form.parse  */

/*  console.log(files.photo.originalFilename)
        const images = new Imagee({
            originalname: files.photo.originalFilename,
            filename: Date.now()+".png",
            path: Date.now()+".png",
            pathupload: Date.now()+".png",            
        }) 
    
        images.save((err)=>{
            if(err)res.status(500).send({message:`Error ${err}`})          
        })   */
        
        

         User.findByIdAndUpdate(req.body.id,{"avatar": "../../assets/uploads/"+req.file.filename}, (err, result)=>{
            if(err) res.status(500).send(err)        
        })

        User.findById(req.body.id, (err, user)=> {

            return res.status(200).send({
                message:'Successfully updated',
                token: service.createToken(user)
            })
        }) 
      
        


}//updatePicture

function updateUser (req, res) {    


   

        
        if(req.body.name)
        User.findByIdAndUpdate(req.body.id,{"name": req.body.name }, function(err, result){
            
        })       
    
        if(req.body.email)        
            User.findByIdAndUpdate(req.body.id,{"email": req.body.email }, function(err, result){       
                
        })
        
        if(req.body.password)
            User.findByIdAndUpdate(req.body.id,{"password": req.body.password }, function(err, result){       
                
        })
        

        User.findByIdAndUpdate(req.body.id,{"showLastFavorites": req.body.showLastFavorites }, (err, result)=>{
            
        })        
        
        User.findByIdAndUpdate(req.body.id,{"showLastComments": req.body.showLastComments }, (err, result)=>{
                
        })

        
        User.findByIdAndUpdate(req.body.id,{"showLastRatings": req.body.showLastRatings }, (err, result)=>{      
            
        })


    const t = async()=>{       


            User.findById(req.body.id, (err, user)=> {
                console.log("4")
                    return res.status(200).send({
                        message:'Successfully updated',
                        token: service.createToken(user)
                    })      
                
            })//user.findOne  
        
  


    }

t()


     
 }//updateUser


function deleteStuff (req,res) {
    console.log(req.body.id)   

    User.findById(req.body.id , (err, user)=>{
        if(err)return res.status(500).send({message: err}) 
        
        user.remove(err=>{
            if(err)return res.status(500).send({message: err}) 
            else res.status(200).send({message:'Successfully deleted'})
        })        
    })    
}




function getCheckBoxes (req, res) {

    User.findById(req.body.iduser, (err, user)=> {

        return res.status(200).send({
            showLastFavorites: user.showLastFavorites,
            showLastComments: user.showLastComments,
            showLastRatings: user.showLastRatings,
        })
    }) 
     
}//getCheckBoxes





module.exports = {
    signup,
    signin,
    updatePicture,
    updateUser,
    deleteStuff,
    getCheckBoxes,
}
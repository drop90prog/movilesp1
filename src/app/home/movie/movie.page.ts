import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DomSanitizer } from '@angular/platform-browser';
import { trailers } from './trailersapi';


const helper = new JwtHelperService();

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  urll= "https://image.tmdb.org/t/p/w500/"
  titulo:string
  overview:string
  imagen:string 
  voteAverage:any
  voteCount:any
  ide:any

  ideuser:any
  username:string

  movie:any;

  currentRate = 0;


  public eslaids = []
  trailerVisible:Boolean = false;
  enlace: string;
  trailer;


  favorite: Boolean = false;
  

  

  constructor(public dom:DomSanitizer) { 
    
  }
  
  ngOnInit() {

    this.movie= JSON.parse(localStorage.getItem('movie'))
    
    let ls=localStorage.getItem('token')
    let iusername = helper.decodeToken(ls);
    this.username =iusername.name 
    this.ideuser = iusername.sub
    this.getComments()
    this.getRatings()
    this.findFavoritePropio()
    this.getReviews()
    


    this.eslaids = [
      {imagen: this.urll+this.movie.poster_path},
      {imagen: this.urll+this.movie.backdrop_path},          
    ]

    
    for (let x in trailers){
      if(trailers[x].id == this.movie.id)this.enlace=trailers[x].trailer
    }
    this.trailer=this.dom.bypassSecurityTrustResourceUrl(this.enlace)


  }//ngOnInit



  comments=[]

  komentario

  getComments(){

    let info = {idmovie:this.movie.id}

    fetch('http://localhost:3000/findcomments', {
/*       fetch('https://movilesp1.herokuapp.com/findcomments', { */
      method: 'POST', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
           
            if(data.resultado.length>0){
              
              for (let a in data.resultado){
                
                this.comments.push({
                  user: data.resultado[a].username,
                  comment: data.resultado[a].comment,
                  iduser: data.resultado[a].iduser,
                  borrable: false,
                  idcomment: data.resultado[a]._id,
                  
                })
                //para activar el boton delete solo a los comentarios propios
                if(data.resultado[a].iduser == this.ideuser) this.comments[a].borrable=true;


              }             
            }

          })
          
      
        }
      
      }) 
      .catch(error => console.error('Error:', error))

  }//getComments

  deleteComment(arg){
    let info = {idcomment:arg};

    fetch('http://localhost:3000/deletecomment', {
/*     fetch('https://movilesp1.herokuapp.com/deletecomment', { */
      method: 'DELETE', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
            alert(data.message)
            this.currentRate=0
            location.reload()
            
          })     
        }
      
      }) 
      .catch(error => console.error('Error:', error))
    
  }



  voteUp(){
    
  }



  back(){
    localStorage.removeItem('movie')
    localStorage.removeItem('perfilde')
    localStorage.removeItem('lastcomments')
    localStorage.removeItem('lastratings')
    localStorage.removeItem('checkboxes')
    localStorage.removeItem('favorites')
    window.location.href = '/home'
    
  }



  saveComments(){

    if(this.komentario==null)alert("Invalid comment")
    else{

    let info = {idmovie:this.movie.id, moviename:this.movie.original_title , iduser:this.ideuser, comment:this.komentario, username:this.username };

    fetch('http://localhost:3000/savecomment', {
/*     fetch('https://movilesp1.herokuapp.com/savecomment', { */
      method: 'POST', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
            this.comments.push({user:this.username,comment:this.komentario})
            this.komentario=""
            alert(data.message)
            location.reload()            
          })     
        }
      
      }) 
      .catch(error => console.error('Error:', error))

    }
  }





newVoteAverageIsOn:boolean = false;
changeNewVoteAverageIsOn(){
  this.newVoteAverageIsOn = !this.newVoteAverageIsOn
}

  ratingsGotten=[]
  ratings=[]
  newVoteAverage;
  newVoteVoters;



  getRatings(){

    let info = {idmovie:this.movie.id}
    let sumatoria = 0;

    fetch('http://localhost:3000/findrating', {
/*       fetch('https://movilesp1.herokuapp.com/findrating', { */
      method: 'POST', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {            
           
            if(data.resultado.length>0){
              
              for (let a in data.resultado){
/*                 this.ratingsGotten.push({
                  user: data.resultado[a].username,
                  rating: data.resultado[a].rate
                }) */
                this.ratings.push(data.resultado[a].rate)
                sumatoria+=data.resultado[a].rate
                //para que no pueda votar mas de 1 vez el user
                if(data.resultado[a].iduser==this.ideuser)this.currentRate=data.resultado[a].rate
              }

            }

            this.newVoteAverage=((sumatoria)/this.ratings.length).toFixed(1)
            this.newVoteVoters = this.ratings.length
            
          })     
        }

      }) 
      .catch(error => console.error('Error:', error))

  }



  saveRating(){

    let info = {idmovie:this.movie.id, moviename: this.movie.original_title, iduser:this.ideuser, username:this.username, rate:this.currentRate };

    fetch('http://localhost:3000/saverating', {
/*     fetch('https://movilesp1.herokuapp.com/saverating', { */
      method: 'POST', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
            alert(data.message)
            location.reload()
            
          })     
        }
      
      }) 
      .catch(error => console.error('Error:', error))
  }


  deleteVote(){

    let info = {idmovie:this.movie.id, iduser:this.ideuser};

    fetch('http://localhost:3000/deleterating', {
/*     fetch('https://movilesp1.herokuapp.com/deleterating', { */
      method: 'DELETE', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
            alert(data.message)
            this.currentRate=0
            location.reload()
            
          })     
        }
      
      }) 
      .catch(error => console.error('Error:', error))
  }



  refresh(){
    location.reload()
  }

  fetchUser(iduserr, usernameDelComentario){

    if(iduserr!=this.ideuser)localStorage.setItem('perfilde',usernameDelComentario)
    //iduserr = id del user del comentario
    //this.ideuser = id del usuario logeado(sacado del token)
    const lab = async()=>{

      
      let info = {iduser:iduserr};
    
         await fetch('http://localhost:3000/find5lastcomments', {
    /*       fetch('https://movilesp1.herokuapp.com/find5lastcomments', { */
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            }).then(res =>{ 
            
              if(res.status==200) {   
                
                res.json().then((data) => {
                  
                  let contador=0
                  let er = []
                  let regresivo = data.resultado.length-1
                  for(let i=0; i<data.resultado.length; i++){
                    er.push({
                      movie: data.resultado[regresivo].moviename,
                      comment: data.resultado[regresivo].comment
                    })
                    regresivo-- 
                    contador++
                    if(contador==5)break
                  }
                  localStorage.setItem('lastcomments', JSON.stringify(er))
                  
                })//res.json.then
              }//if(res.status==200)
            
            }) 
            .catch(error => console.error('Error:', error))
    
    
    //=========================================================================
    
    
     await fetch('http://localhost:3000/find5lastratings', {
      /*       fetch('https://movilesp1.herokuapp.com/find5lastratings', { */
              method: 'post', 
              body: JSON.stringify(info), 
              headers:{            
                  'Content-Type': 'application/json'
              }
              }).then(res =>{ 
              
                if(res.status==200) {   
                  
                  res.json().then((data) => {                
      
                    let contador=0
                    let er = []
                    let regresivo = data.resultado.length-1
                    for(let i=0; i<data.resultado.length; i++){
                      er.push({
                        movie: data.resultado[regresivo].moviename,
                        rate: data.resultado[regresivo].rate
                      })
                      regresivo--
                      contador++
                      if(contador==5)break
                    }
                    localStorage.setItem('lastratings', JSON.stringify(er))               
                    
                  })//res.json.then
                }//if(res.status==200)
              
              }) 
              .catch(error => console.error('Error:', error))
    
    
    
    
    //=========================================================================
    
    
    await fetch('http://localhost:3000/getcheckboxes', {
      /*       fetch('https://movilesp1.herokuapp.com/getcheckboxes', { */
              method: 'post', 
              body: JSON.stringify(info), 
              headers:{            
                  'Content-Type': 'application/json'
              }
              }).then(res =>{ 
              
                if(res.status==200) {   
                  
                  res.json().then((data) => {
                      
                    
                    let er = [{
                      showLastFavorites: data.showLastFavorites,
                      showLastComments: data.showLastComments,
                      showLastRatings: data.showLastRatings,
                    }]
    
                    localStorage.setItem('checkboxes', JSON.stringify(er))
                    
                  })//res.json.then
                }//if(res.status==200)
              
              }) 
              .catch(error => console.error('Error:', error))
    
    
              




   //=========================================================================


    await fetch('http://localhost:3000/findfavorites', {
/*       fetch('https://movilesp1.herokuapp.com/findfavorites', { */
    method: 'POST', 
    body: JSON.stringify(info), 
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {    
        res.json().then((data) => {         
          
          if(data.resultado.length>0){

            let contador=0
            let favoritos = []
            let regresivo = data.resultado.length-1
            for(let i=0; i<data.resultado.length; i++){
              favoritos.push({
                movie: data.resultado[regresivo].moviename,
                
              })
              regresivo--
              contador++
              if(contador==5)break
            }
            localStorage.setItem('favorites', JSON.stringify(favoritos))   
            
        }


        })    
        
      }
    
    }) 
    .catch(error => console.error('Error:', error))
    
    

    window.location.href = '/home/profile'
    
    }//lab

 




    
    lab()
         
      }//fetchuser



verTrailer(){
  this.trailerVisible=!this.trailerVisible
}

saveFavorite(){

    let info = {
      iduser:this.ideuser,
      username:this.username,
      idmovie:this.movie.id,
      moviename: this.movie.original_title,      
    }

    fetch('http://localhost:3000/savefavorite', {
/*       fetch('https://movilesp1.herokuapp.com/savefavorite', { */
      method: 'POST', 
      body: JSON.stringify(info), 
      headers:{
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {
          
          res.json().then((data) => {           
            this.favorite= !this.favorite 
            alert(data.message)
          })      
        }
      
      }) 
      .catch(error => console.error('Error:', error))

  
}



//para saber si esa pelicula es favorita del user logueado
findFavoritePropio(){

  let info = {
    iduser:this.ideuser,
    idmovie:this.movie.id,  
  }

  fetch('http://localhost:3000/findfavorites', {
/*       fetch('https://movilesp1.herokuapp.com/findfavorites', { */
    method: 'POST', 
    body: JSON.stringify(info), 
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {    
          this.favorite= !this.favorite         
      }
    
    }) 
    .catch(error => console.error('Error:', error))

}



comentariosVista:Boolean = true;
criticasVista:Boolean = false;
cambiar(){
  this.comentariosVista = !this.comentariosVista
  this.criticasVista = !this.criticasVista  
}



reviews=[]
ratereview:number=0;
getReviews(){

  const getreviewsyratings = async()=>{

    let info = {idmovie:this.movie.id}

  await fetch('http://localhost:3000/findreviews', {
/*      await fetch('https://movilesp1.herokuapp.com/findreviews', { */
    method: 'POST', 
    body: JSON.stringify(info), 
    headers:{            
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {
        
        res.json().then((data) => {
         
          if(data.resultado.length>0){
            //aqui agarramos username, critica e iduser de todos los que ublicaron criticas
            for (let a in data.resultado){
              this.reviews.push({
                user: data.resultado[a].username,
                review: data.resultado[a].review,
                iduser: data.resultado[a].iduser,
                rate: 0, //0 porque no he votado por ellos, pero pronto abajito esto cambiara
                borrable: false,
                idreview: data.resultado[a]._id
              })
              if(data.resultado[a].iduser == this.ideuser) this.reviews[a].borrable=true;
            }//for             
          }//if(data.resultado.length>0){
        })//res.json().then((data) => {
        
    
      }
    
    }) 
    .catch(error => console.error('Error:', error))
//============================================================

let infos = {idmovie:this.movie.id, iduser:this.ideuser}

  await fetch('http://localhost:3000/findratingreviewpersonal', {
/*      await fetch('https://movilesp1.herokuapp.com/findratingreviewpersonal', { */
    method: 'POST', 
    body: JSON.stringify(infos), 
    headers:{            
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {
        
        res.json().then((data) => {
         
          if(data.resultado.length>0){
            //aqui agarramos username, critica e iduser de todos los que ublicaron criticas
            for (let a in data.resultado){
              for(let b in this.reviews){
                if(data.resultado[a].iduserreviewer == this.reviews[b].iduser)
                this.reviews[b].rate=data.resultado[a].rate
              }


              
             
            }//for             
          }//if(data.resultado.length>0){
        })//res.json().then((data) => {
        
    
      }
    
    }) 
    .catch(error => console.error('Error:', error))








  }//getreviewsyratings

  getreviewsyratings()

  

}//getReviews

rateReview = 0;
revComment:string
saveReview(){

  if(this.revComment==null)alert("Invalid review")
  else{

  let info = {idmovie:this.movie.id, moviename:this.movie.original_title , iduser:this.ideuser, username:this.username, review:this.revComment};

  fetch('http://localhost:3000/savereview', {
/*     fetch('https://movilesp1.herokuapp.com/savereview', { */
    method: 'POST', 
    body: JSON.stringify(info), 
    headers:{            
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {        
        res.json().then((data) => {
          this.reviews.push({user:this.username,review:this.revComment})
          this.revComment=""
          alert(data.message)
          location.reload()
        })     
      }
      if(res.status==404) {        
        res.json().then((data) => {
          this.revComment=""
          alert(data.message)
        })     
      }
    
    }) 
    .catch(error => console.error('Error:', error))

  }
}

ratemovietoo:boolean=false;

saveRatingReview(iduserreviewerr){

  let info = {
    idmovie:this.movie.id, 
    moviename: this.movie.original_title, 
    iduser:this.ideuser, 
    username:this.username, 
    rate:this.ratereview, 
    iduserreviewer: iduserreviewerr };

  fetch('http://localhost:3000/saveratingreview', {
/*     fetch('https://movilesp1.herokuapp.com/saveratingreview', { */
    method: 'POST', 
    body: JSON.stringify(info), 
    headers:{            
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {   
        
        res.json().then((data) => {
          alert(data.message)
          this.ratemovietoo=true
          location.reload()
          
        })     
      }
    
    }) 
    .catch(error => console.error('Error:', error))
}


deleteVoteReview(arg){

 console.log(arg)
  let info = {iduser:this.ideuser, idmovie:this.movie.id , iduserreviewer:arg};

  fetch('http://localhost:3000/deleteratingreview', {
/*     fetch('https://movilesp1.herokuapp.com/deleteratingreview', { */
    method: 'DELETE', 
    body: JSON.stringify(info), 
    headers:{            
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {   
        
        res.json().then((data) => {
          alert(data.message)
          this.currentRate=0
          location.reload()
          
        })     
      }
    
    }) 
    .catch(error => console.error('Error:', error))
    
}


deleteReview(arg){
  let info = {idreview:arg};

  fetch('http://localhost:3000/deletereview', {
/*     fetch('https://movilesp1.herokuapp.com/deletereview', { */
    method: 'DELETE', 
    body: JSON.stringify(info), 
    headers:{            
        'Content-Type': 'application/json'
    }
    }).then(res =>{ 
    
      if(res.status==200) {   
        
        res.json().then((data) => {
          alert(data.message)
          this.currentRate=0
          location.reload()
          
        })     
      }
    
    }) 
    .catch(error => console.error('Error:', error))
  
}























commentPropio:boolean = true;




}//class
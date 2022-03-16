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


    this.eslaids = [
      {imagen: this.urll+this.movie.poster_path},
      {imagen: this.urll+this.movie.backdrop_path},          
    ]

    
    for (let x in trailers){
      if(trailers[x].id == this.movie.id)this.enlace=trailers[x].trailer
    }
    this.trailer=this.dom.bypassSecurityTrustResourceUrl(this.enlace)


  }



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
                  iduser: data.resultado[a].iduser
                })               
              }             
            }

          })
          
      
        }
      
      }) 
      .catch(error => console.error('Error:', error))

  }



  voteUp(){
    
  }



  back(){
    localStorage.removeItem('movie')
    window.location.href = '/home'

  }

  saveComments(){

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
          })     
        }
      
      }) 
      .catch(error => console.error('Error:', error))
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
                    console.log(data)   
                    
                    let er = [{
                      showTopFavorites: data.showTopFavorites,
                      showLastComments: data.showLastComments,
                      showLastRatings: data.showLastRatings,
                    }]
    
                    localStorage.setItem('checkboxes', JSON.stringify(er))
                    
                  })//res.json.then
                }//if(res.status==200)
              
              }) 
              .catch(error => console.error('Error:', error))
    
    
              window.location.href = '/home/profile'
    
    
    
    }//lab
    
    lab()
         
      }//fetchuser



verTrailer(){
  this.trailerVisible=!this.trailerVisible
}





}




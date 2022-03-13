import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

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

  constructor() { }
  
  ngOnInit() {

    this.movie= JSON.parse(localStorage.getItem('movie'))
    
    let ls=localStorage.getItem('token')
    let iusername = helper.decodeToken(ls);
    this.username =iusername.name 
    this.ideuser = iusername.sub
    this.getComments()
    
  }



  comments=[]

  komentario

  getComments(){

    let info = {idmovie:this.movie.id}

/*     fetch('http://localhost:3000/findcomments', { */
      fetch('https://movilesp1.herokuapp.com/findcomments', {
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
                  comment: data.resultado[a].comment
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

    let info = {idmovie:this.movie.id, iduser:this.ideuser, comment:this.komentario, username:this.username };

/*     fetch('http://localhost:3000/savecomment', { */
    fetch('https://movilesp1.herokuapp.com/savecomment', {
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




}




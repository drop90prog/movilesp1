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

  username:string

  constructor() { }
  
  ngOnInit() {
    this.titulo = localStorage.getItem('titulo')
    this.overview = localStorage.getItem('overview')
    this.imagen = localStorage.getItem('imagen')
    this.voteAverage = localStorage.getItem('voteAverage')
    this.voteCount = localStorage.getItem('voteCount')
    this.ide = localStorage.getItem('ide') 
    
    let ls=localStorage.getItem('token')
    let iusername = helper.decodeToken(ls);
    this.username =iusername.name 
    
  }



  comments=[]

  komentario

  comentar(){
    this.comments.push({user:this.username,comment:this.komentario})
    this.komentario=""
    console.log(this.comments)
  }



  voteUp(){
    
  }



  back(){
    localStorage.clear()
    window.location.href = '/home'

  }

  saveComments(){


    let info = { };


    fetch('https://movilesp1.herokuapp.com/update', {
      method: 'POST', 
      body: JSON.stringify(info), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
            localStorage.clear()
            localStorage.setItem('token',data.token)
            let fdd=localStorage.getItem('token')
            let iusernamee = helper.decodeToken(fdd);
            this.username =iusernamee.name   
            alert("Cambio realizado...")
          })
          
     
        }
      
      }) 
      .catch(error => console.error('Error:', error))
      .then(response => console.log(response));
  }




}




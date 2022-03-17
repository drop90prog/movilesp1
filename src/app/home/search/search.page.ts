import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor() { }

  moviesToken;
  movies = [];
  backup = []
  sorch:string;

  ngOnInit() {
    this.moviesToken=JSON.parse(localStorage.getItem('allmovies'))

    //renderear todas las peliculas
    for (let x in this.moviesToken){
      let singleArray = this.moviesToken[x]
      
      for (let y in singleArray){

        this.movies.push(singleArray[y])        
      }

    }
    this.backup = this.movies
  }



  lookInto(pelicula){

    localStorage.setItem('movie',JSON.stringify(pelicula))
    window.location.href = '/home/movie'
 
  }


  back(){
    localStorage.removeItem('allmovies')
    window.location.href = '/home'

  }

  french(){

    this.movies = []
    for (let x in this.moviesToken){
      let singleArray = this.moviesToken[x]
      
      for (let y in singleArray){

       if(singleArray[y].original_language=="fr") this.movies.push(singleArray[y])        
      }

    }   

  }


  japanese(){
        
    this.movies = []
    for (let x in this.moviesToken){
      let singleArray = this.moviesToken[x]
      
      for (let y in singleArray){

       if(singleArray[y].original_language=="ja") this.movies.push(singleArray[y])        
      }

    }   

  }

  russian(){
        
    this.movies = []
    for (let x in this.moviesToken){
      let singleArray = this.moviesToken[x]
      
      for (let y in singleArray){

       if(singleArray[y].original_language=="ru") this.movies.push(singleArray[y])        
      }

    }   

  }
  


  best(){
    this.movies = []
    this.movies = this.backup
    this.movies.sort((p1,p2)=>{
      if(p1.vote_average < p2.vote_average)return 1
      if(p1.vote_average > p2.vote_average)return -1
      if(p1.vote_average == p2.vote_average)return 0
    })
  }

  mostvoted(){
    this.movies = []
    this.movies = this.backup
    this.movies.sort((p1,p2)=>{
      if(p1.vote_count < p2.vote_count)return 1
      if(p1.vote_count > p2.vote_count)return -1
      if(p1.vote_count == p2.vote_count)return 0
    })
  }



  todas(){

    this.movies = []

    for (let x in this.moviesToken){
      let singleArray = this.moviesToken[x]
      
      for (let y in singleArray){

        this.movies.push(singleArray[y])        
      }

    }    
  }


}

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
  sorch:string;

  ngOnInit() {
    this.moviesToken=JSON.parse(localStorage.getItem('allmovies'))

    
    for (let x in this.moviesToken){
      let singleArray = this.moviesToken[x]
      
      for (let y in singleArray){

        this.movies.push(singleArray[y])
        
        
      }

    }    
  }



  lookInto(pelicula){

    localStorage.setItem('movie',JSON.stringify(pelicula))
    window.location.href = '/home/movie'
 
  }


  back(){
    localStorage.removeItem('allmovies')
    window.location.href = '/home'

  }





}

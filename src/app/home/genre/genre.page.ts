import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.page.html',
  styleUrls: ['./genre.page.scss'],
})
export class GenrePage implements OnInit {

  constructor() { }

  movies;
  genero;

  ngOnInit() {
    this.movies = JSON.parse(localStorage.getItem('muvi'))
    this.genero = localStorage.getItem('muvigen')
  }


  lookInto(pelicula){
    localStorage.removeItem('muvi')
    localStorage.removeItem('muvigen')

    localStorage.setItem('movie',JSON.stringify(pelicula))
    window.location.href = '/home/movie'
 
  }




  back(){
    localStorage.removeItem('muvigen')
    window.location.href = '/home'

  }






}

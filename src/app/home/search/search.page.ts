import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor() { }

  movies;
  sorch:string;

  ngOnInit() {
    this.movies=JSON.parse(localStorage.getItem('movie'))
  }



  lookInto(pelicula){
    localStorage.removeItem('muvi')
    localStorage.removeItem('muvigen')

    localStorage.setItem('movie',JSON.stringify(pelicula))
    window.location.href = '/home/movie'
 
  }








}

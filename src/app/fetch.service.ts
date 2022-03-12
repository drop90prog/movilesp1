import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2120307b21e02afa98bde189c351c683';

const api_movies_pag1 = "https://api.themoviedb.org/3/movie/popular?api_key=388e20400ba649646de0197f785eb437&language=en-US&page=1"
const api_movies_pag2 = "https://api.themoviedb.org/3/movie/popular?api_key=388e20400ba649646de0197f785eb437&language=en-US&page=2"
const api_movies_pag3 = "https://api.themoviedb.org/3/movie/popular?api_key=388e20400ba649646de0197f785eb437&language=en-US&page=3"
const api_movies_pag4 = "https://api.themoviedb.org/3/movie/popular?api_key=388e20400ba649646de0197f785eb437&language=en-US&page=4"
const api_movies_pag5 = "https://api.themoviedb.org/3/movie/popular?api_key=388e20400ba649646de0197f785eb437&language=en-US&page=5"



@Injectable({
  providedIn: 'root'
})
export class FetchService {


  constructor(private http: HttpClient) { }


   movieData(res) {
    return res ;
  }
  getMovieData(): Observable<any> {
    return this.http.get(api_url).pipe(
      map(this.movieData));
  }

//===============================page1
  page1(res) {
    return res ;
  }
  getPage1(): Observable<any> {
    return this.http.get(api_movies_pag1).pipe(
      map(this.page1));
  }



//===============================page2
  page2(res) {
    return res ;
  }
  getPage2(): Observable<any> {
    return this.http.get(api_movies_pag2).pipe(
      map(this.page2));
  }



//===============================page3
  page3(res) {
    return res ;
  }
  getPage3(): Observable<any> {
    return this.http.get(api_movies_pag3).pipe(
      map(this.page3));
  }


//===============================page4
  page4(res) {
    return res ;
  }
  getPage4(): Observable<any> {
    return this.http.get(api_movies_pag4).pipe(
      map(this.page4));
  }


//===============================page5
  page5(res) {
    return res ;
  }
  getPage5(): Observable<any> {
    return this.http.get(api_movies_pag5).pipe(
      map(this.page5));
  }






















}
  
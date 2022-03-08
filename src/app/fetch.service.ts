import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2120307b21e02afa98bde189c351c683';

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
}
  









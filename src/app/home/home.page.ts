import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  movie: any;
  constructor(private fesh: FetchService) {   }

  ngOnInit(){
    this.useMovieData();    
  }//end of ngOnInit


  async useMovieData() {
    await this.fesh.getMovieData()
      .subscribe(res => {
        console.log('subscribe: '+res);
        this.movie = res.results;
    console.log(this.movie);
      }, err => {
        console.log(err);
      });
  }
  
  img_url = "https://image.tmdb.org/t/p/w500";
  
  
     sliderConfigMovie = {
      slidesPerView: 2.7      
    }
  
  
  checkRating123(num){
    if(num>=1 && num<4)return true   
  }
  checkRating45(num){
    if(num>=4 && num<6)return true   
  }
  checkRating67(num){
    if(num>=6 && num<8)return true   
  }
  checkRating8(num){
    if(num>=8 && num<9)return true    
  }
  checkRating910(num){
    if(num>=9 && num<=10)return true   
  }
  checkRating0(num){
    if(num==0)return true   
  }
  
  
  public gender = [
    {genero:'Drama'},
    {genero:'Comedia'},
    {genero:'Suspenso'},
    {genero:'Romance'},
    {genero:'Ciencia Ficción'},
    {genero:'Fantasia'},
    {genero:'Acción'},
    {genero:'Terror'},
  ]
  
  /* 
  logout(){ 
    
    fetch('http://localhost:3000/signout', {
      method: 'POST',     
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res => res.json() ) 
      .catch(error => console.error('Error:', error))
      .then(response => console.log(response));
    }
  
   */





}

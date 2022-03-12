import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  movie: any;
  page1: any;
  page2: any
  page3: any
  page4: any
  page5: any
  movieGenre = []
  
  constructor(private fesh: FetchService) {   }

  ngOnInit(){
    this.useMovieData();    
  }//end of ngOnInit


  async useMovieData() {
    await this.fesh.getMovieData()
      .subscribe(res => {
        this.movie = res.results;
      }, err => {
        console.log(err);
      });
  }

//====================================page1
  async usePage1(idgenre, genr) {
    await this.fesh.getPage1()
      .subscribe(res => {
        this.page1 = res.results;
        for (let x in this.page1){
          let ocarina = res.results[x].genre_ids
            for (let y in ocarina){
              if(ocarina[y]==idgenre) this.movieGenre.push(res.results[x])
            }         
        }

        
        localStorage.setItem('muvi',JSON.stringify(this.movieGenre))
        localStorage.setItem('muvigen',genr)

        /* JSON.parse() */
        

       
        
      }, err => {
        console.log(err);
      });
  }


  //====================================page2
  async usePage2() {
    await this.fesh.getPage2()
      .subscribe(res => {
        this.page2 = res.results;
    /* console.log(this.page2); */
      }, err => {
        console.log(err);
      });
  }

    //====================================page3
    async usePage3() {
      await this.fesh.getPage3()
        .subscribe(res => {

          this.page3 = res.results;
      /* console.log(this.page3); */
        }, err => {
          console.log(err);
        });
    }

      //====================================page4
  async usePage4() {
    await this.fesh.getPage4()
      .subscribe(res => {
        this.page4 = res.results;
    /* console.log(this.page4); */
      }, err => {
        console.log(err);
      });
  }

    //====================================page5
    async usePage5() {
      await this.fesh.getPage5()
        .subscribe(res => {
          this.page5 = res.results;
      /* console.log(this.page5); */
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
  
  
  public genre = [
    {genre:'Drama', id: 18},
    {genre:'Comedy', id: 35},
    {genre:'Thriller', id: 53},
    {genre:'Romance', id: 10749},
    {genre:'Science Fiction', id: 878},
    {genre:'Fantasy', id: 14},
    {genre:'Action', id: 28},
    {genre:'Horror', id: 27},
  ]


  getMoviesGenre(genero, id){
    this.usePage1(id, genero)
    this.usePage2()
    this.usePage3()
    this.usePage4()
    this.usePage5()


    window.location.href = '/home/genre';

  }
  


 send(mov){


     localStorage.setItem('movie', JSON.stringify(mov))
     window.location.href = '/home/movie';

}

  signout(){
    localStorage.clear()
    window.location.href = '/signin';
  }

}

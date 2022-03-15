import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  movie: any;//solo para el top rated
  allmovies = []
  rated: any;
  page1: any;
  page2: any;
  page3: any;
  page4: any;
  page5: any;
  movieGenre = []

  ideuser
  
  constructor(private fesh: FetchService) {   }

  ngOnInit(){
    this.useMovieData();


    let ls=localStorage.getItem('token')
    let iusername = helper.decodeToken(ls);
    this.ideuser = iusername.sub






  }//end of ngOnInit


  async useMovieData() {
    await this.fesh.getMovieData()
      .subscribe(res => {
        this.movie = res.results;
/*         localStorage.setItem('movie',JSON.stringify(this.movie)) */
      }, err => {
        console.log(err);
      });
  }

//====================================page1
  async usePage1(idgenre, genr) {

    if(idgenre==null){ console.log("1")
      await this.fesh.getPage1()
      .subscribe(res => {
        this.allmovies.push(res.results)
        localStorage.setItem('allmovies',JSON.stringify(this.allmovies))
      }, err => {
        console.log(err);
      });
    }

    else{
    await this.fesh.getPage1()
      .subscribe(res => { 
        this.page1 = res.results;
        for (let x in this.page1){
          let ocarina = res.results[x].genre_ids
            for (let y in ocarina){
              if(ocarina[y]==idgenre) this.movieGenre.push(res.results[x])
            }
        }

        //esto es para buscar por genero
        localStorage.setItem('muvi',JSON.stringify(this.movieGenre))
        localStorage.setItem('muvigen',genr)
        
      }, err => {
        console.log(err);
      });
    }
  }


  //====================================page2
  async usePage2(idgenre, genr) {

    if(idgenre==null){ console.log("2")
      await this.fesh.getPage2()
      .subscribe(res => {
        this.allmovies.push(res.results)
        localStorage.setItem('allmovies',JSON.stringify(this.allmovies))
      }, err => {
        console.log(err);
      });
    }

    else{
    await this.fesh.getPage2()
      .subscribe(res => {
        this.page2 = res.results;
        for (let x in this.page2){
          let ocarina = res.results[x].genre_ids
            for (let y in ocarina){
              if(ocarina[y]==idgenre) this.movieGenre.push(res.results[x])
            }
        }

        //esto es para buscar por genero
        localStorage.setItem('muvi',JSON.stringify(this.movieGenre))
        localStorage.setItem('muvigen',genr)
      }, err => {
        console.log(err);
      });
    }
  }

    //====================================page3
    async usePage3(idgenre, genr) {


      if(idgenre==null){console.log("3")
        await this.fesh.getPage3()
        .subscribe(res => {
          this.allmovies.push(res.results)
          localStorage.setItem('allmovies',JSON.stringify(this.allmovies))
        }, err => {
          console.log(err);
        });
      }

      else{
      await this.fesh.getPage3()
        .subscribe(res => {

          this.page3 = res.results;
          for (let x in this.page3){
            let ocarina = res.results[x].genre_ids
              for (let y in ocarina){
                if(ocarina[y]==idgenre) this.movieGenre.push(res.results[x])
              }
          }
  
          //esto es para buscar por genero
          localStorage.setItem('muvi',JSON.stringify(this.movieGenre))
          localStorage.setItem('muvigen',genr)
        }, err => {
          console.log(err);
        });
      }
    }

      //====================================page4
  async usePage4(idgenre, genr) {

    if(idgenre==null){console.log("4")
      await this.fesh.getPage4()
      .subscribe(res => {
        this.allmovies.push(res.results)
        localStorage.setItem('allmovies',JSON.stringify(this.allmovies))
      }, err => {
        console.log(err);
      });
    }


    else{
    await this.fesh.getPage4()
      .subscribe(res => {
        this.page4 = res.results;
        for (let x in this.page4){
          let ocarina = res.results[x].genre_ids
            for (let y in ocarina){
              if(ocarina[y]==idgenre) this.movieGenre.push(res.results[x])
            }
        }

        //esto es para buscar por genero
        localStorage.setItem('muvi',JSON.stringify(this.movieGenre))
        localStorage.setItem('muvigen',genr)
      }, err => {
        console.log(err);
      });
    }
  }

    //====================================page5
    async usePage5(idgenre, genr) {

      if(idgenre==null){console.log("5")
        await this.fesh.getPage5()
        .subscribe(res => {
          this.allmovies.push(res.results)
          localStorage.setItem('allmovies',JSON.stringify(this.allmovies))
        }, err => {
          console.log(err);
        });
      }

      else{
      await this.fesh.getPage5()
        .subscribe(res => {
          this.page5 = res.results;
          for (let x in this.page5){
            let ocarina = res.results[x].genre_ids
              for (let y in ocarina){
                if(ocarina[y]==idgenre) this.movieGenre.push(res.results[x])
              }
          }
  
          //esto es para buscar por genero
          localStorage.setItem('muvi',JSON.stringify(this.movieGenre))
          localStorage.setItem('muvigen',genr)
        }, err => {
          console.log(err);
        });
      }
    }


    

    search(){

      
        this.usePage1(null, null)
        this.usePage2(null, null)
        this.usePage3(null, null)
        this.usePage4(null, null)
        this.usePage5(null, null)
        window.location.href = "/home/search"
        
  
      
      
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
    this.usePage2(id, genero)
    this.usePage3(id, genero)
    this.usePage4(id, genero)
    this.usePage5(id, genero)


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






//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================







  fetchUser(iduser){



const lab = async()=>{






  console.log(iduser)
    
  
  let info = {iduser:this.ideuser};

     await fetch('http://localhost:3000/find5lastcomments', {
/*       fetch('https://movilesp1.herokuapp.com/find5lastcomments', { */
        method: 'post', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        }).then(res =>{ 
        
          if(res.status==200) {   
            
            res.json().then((data) => {
              
              let contador = 0
              let er = []
              let regresivo = data.resultado.length-1
              for(let i=0; i<data.resultado.length; i++){
                er.push({
                  movie: data.resultado[regresivo].moviename,
                  comment: data.resultado[regresivo].comment
                })
                regresivo--
                contador++
                if(contador==10)break
              }
              localStorage.setItem('lastcomments', JSON.stringify(er))
              
            })//res.json.then
          }//if(res.status==200)
        
        }) 
        .catch(error => console.error('Error:', error))


//=========================================================================


 await fetch('http://localhost:3000/find5lastratings', {
  /*       fetch('https://movilesp1.herokuapp.com/find5lastratings', { */
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          }).then(res =>{ 
          
            if(res.status==200) {   
              
              res.json().then((data) => {                
                let contador = 0
                let er = []
                let regresivo = data.resultado.length-1
                for(let i=0; i<data.resultado.length; i++){
                  er.push({
                    movie: data.resultado[regresivo].moviename,
                    rate: data.resultado[regresivo].rate
                  })
                  regresivo--
                  contador++
                  if(contador==10)break
                }
                localStorage.setItem('lastratings', JSON.stringify(er))               
                
              })//res.json.then
            }//if(res.status==200)
          
          }) 
          .catch(error => console.error('Error:', error))




//=========================================================================


await fetch('http://localhost:3000/getcheckboxes', {
  /*       fetch('https://movilesp1.herokuapp.com/getcheckboxes', { */
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          }).then(res =>{ 
          
            if(res.status==200) {   
              
              res.json().then((data) => {
                console.log(data)   
                
                let er = [{
                  showTopFavorites: data.showTopFavorites,
                  showLastComments: data.showLastComments,
                  showLastRatings: data.showLastRatings,
                }]

                localStorage.setItem('checkboxes', JSON.stringify(er))
                
              })//res.json.then
            }//if(res.status==200)
          
          }) 
          .catch(error => console.error('Error:', error))


          window.location.href = '/home/profile'



}//lab

lab()
     
  }//fetchuser



//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
//==============================================================================
























































































}//class
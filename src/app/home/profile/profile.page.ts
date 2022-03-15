import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public router: Router) {
    
   }

   username: string

   lastcomments;
   lastratings;
   checkboxes;



  ngOnInit() {
    let fd=localStorage.getItem('token')
    let iusername = helper.decodeToken(fd);
    this.username =iusername.name 

    this.lastcomments = JSON.parse(localStorage.getItem('lastcomments'))
    this.lastratings = JSON.parse(localStorage.getItem('lastratings'))
    this.checkboxes = JSON.parse(localStorage.getItem('checkboxes'))
    /* console.log(this.checkboxes[0].showTopFavorites) */
    this.showTopFavorites = this.checkboxes[0].showTopFavorites
    this.showLastComments = this.checkboxes[0].showLastComments
    this.showLastRatings = this.checkboxes[0].showLastRatings

  }


  editIsPrivate:boolean = false;
  showTopFavorites:boolean = false
  showLastComments:boolean = true;
  showLastRatings:boolean = true;


  email:string; name:string; password:string;

  guardarCambios(){
    let d=localStorage.getItem('token')
    let decodedToken = helper.decodeToken(d);
    

    let account = { 
      id:decodedToken.sub, 
      email:this.email, 
      name:this.name, 
      password:this.password, 
      showTopFavorites: this.showTopFavorites,
      showLastComments:this.showLastComments,
      showLastRatings: this.showLastRatings,
    };

    console.log(account)
    fetch('http://localhost:3000/update', {
/*     fetch('https://movilesp1.herokuapp.com/update', { */
      method: 'PUT', 
      body: JSON.stringify(account), 
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



    signout(){
      localStorage.clear()
    }







}// class

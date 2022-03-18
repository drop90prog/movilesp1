import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoadingController } from '@ionic/angular';

const helper = new JwtHelperService();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public router: Router, public loadingController: LoadingController) {
    
   }

   username: string
   emaill: string

   favorites;
   lastcomments;
   lastratings;
   checkboxes;



  ngOnInit() {
    let fd=localStorage.getItem('token')
    let iusername = helper.decodeToken(fd);
    if(!localStorage.getItem('perfilde')){this.username =iusername.name; this.emaill=iusername.email}
    else {this.username = localStorage.getItem('perfilde'); this.editIsPrivate=true}

    this.favorites = JSON.parse(localStorage.getItem('favorites'))
    this.lastcomments = JSON.parse(localStorage.getItem('lastcomments'))
    this.lastratings = JSON.parse(localStorage.getItem('lastratings'))
    this.checkboxes = JSON.parse(localStorage.getItem('checkboxes'))
    
    this.showLastFavorites = this.checkboxes[0].showLastFavorites
    this.showLastComments = this.checkboxes[0].showLastComments
    this.showLastRatings = this.checkboxes[0].showLastRatings

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Saving changes...',      
    });
    await loading.present();
  }


  editIsPrivate:boolean = false;
  showLastFavorites:boolean = false;
  showLastComments:boolean = true;
  showLastRatings:boolean = true;


  email:string; name:string; password:string;

  guardarCambios(){

    const ay = async()=>{
      await this.presentLoading()

    

    let d=localStorage.getItem('token')
    let decodedToken = helper.decodeToken(d);
    

    let account = { 
      id:decodedToken.sub, 
      email:this.email, 
      name:this.name, 
      password:this.password, 
      showLastFavorites: this.showLastFavorites,
      showLastComments:this.showLastComments,
      showLastRatings: this.showLastRatings,
    };

    
    console.log(account)
/*     fetch('http://localhost:3000/update', { */
    fetch('https://movilesp1.herokuapp.com/update', {
      method: 'PUT', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
        this.loadingController.dismiss()
        if(res.status==200) {
          
          res.json().then((data) => {
            localStorage.clear()
            localStorage.setItem('token',data.token)
            let fdd=localStorage.getItem('token')
            let iusernamee = helper.decodeToken(fdd);
            this.username =iusernamee.name 
            this.emaill =iusernamee.email

            this.name = ""
            this.email = ""
            this. password = ""
                    
          })
          
     
        }
      
      }) 
      .catch(error => console.error('Error:', error))
      }//ay
      ay()
    }



    signout(){
      localStorage.clear()
      window.location.href = '/signin';
    }


back(){
  localStorage.removeItem('favorites')
  localStorage.removeItem('lastcomments')
  localStorage.removeItem('lastratings')
  localStorage.removeItem('checkboxes')
  localStorage.removeItem('movie')
  if(localStorage.getItem('perfilde'))localStorage.removeItem('perfilde')
  window.location.href = "/home"

}

deleteAccount(){
  alert("You cannot quit buddy, go rest and come back later")
}




}// class

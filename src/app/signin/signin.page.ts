import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {
  }



  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Authenticating...',      
    });
    await loading.present();
  }


  email:string; password:string;

  sendFetchInicio(){ 

    const ay = async()=>{
      await this.presentLoading()
    
    

    

   
    let account = { email:this.email, password:this.password};
    
    console.log(account)
    fetch('http://localhost:3000/signin', {
/*     fetch('https://movilesp1.herokuapp.com/signin', { */
      method: 'POST', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
        this.loadingController.dismiss()
        if(res.status==200) {
          
          res.json().then((data) => {
            localStorage.setItem('token',data.token)
          })    
          
          window.location.href = '/home';
         
        }
      
      }) 
      .catch(error => console.error('Error:', error))
      }//ay
      ay()
    }

goSignUp(){
  window.location.href = '/signup'
}



}

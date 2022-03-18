import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',      
    });
    await loading.present();
  }


  name:string; email:string; password:string; confirmar:string


  sendFetchRegistro(){ 

    const ay = async()=>{
      await this.presentLoading()  
    let account = { name:this.name, email:this.email, password:this.password};
   
    console.log(account)
/*     fetch('http://localhost:3000/signup', { */
    fetch('https://movilesp1.herokuapp.com/signup', {
      method: 'POST', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{
        this.loadingController.dismiss()
        if(res.status==200) {   
          
          res.json().then((data) => {
            alert(data.message)
          })
          
        }

      }) 
      .catch(error => console.error('Error:', error))

      }//ay

      ay()
    }


    goSignIn(){
      window.location.href = '/signin'
    }


}

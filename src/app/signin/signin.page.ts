import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  email:string; password:string;

  sendFetchInicio(){ 
    let account = { email:this.email, password:this.password};
   
    console.log(account)
    fetch('http://localhost:3000/signin', {
      method: 'POST', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ res.json() 
      
        if(res.status==200) {         
          
          window.location.href = 'http://localhost:8100/home';
        }
      
      }) 
      .catch(error => console.error('Error:', error))
      .then(response => console.log(response));
    }





}

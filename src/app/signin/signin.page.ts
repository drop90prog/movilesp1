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
/*     fetch('http://localhost:3000/signin', { */
    fetch('https://movilesp1.herokuapp.com/signin', {
      method: 'POST', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {   
          
          res.json().then((data) => {
            console.log(data.token)
          })
          
          window.location.href = '/home';
        }
      
      }) 
      .catch(error => console.error('Error:', error))
      .then(response => console.log(response));
    }





}

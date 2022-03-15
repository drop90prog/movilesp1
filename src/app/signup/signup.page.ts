import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  name:string; email:string; password:string; confirmar:string


  sendFetchRegistro(){ 
    let account = { name:this.name, email:this.email, password:this.password};
   
    console.log(account)
    fetch('http://localhost:3000/signup', {
/*     fetch('https://movilesp1.herokuapp.com/signup', { */
      method: 'POST', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{

        if(res.status==200) {   
          
          res.json().then((data) => {
            alert(data.message)
          })
          
        }

      }) 
      .catch(error => console.error('Error:', error))
    }


    goSignIn(){
      window.location.href = '/signin'
    }


}

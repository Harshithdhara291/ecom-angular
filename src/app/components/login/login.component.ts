import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private auth: AuthService) { }

  // @ViewChild('register') registerForm:any;

  passwordType:any = 'password';

  showHidePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  signingIn:any=false

  loginUser(login:any){
    this.signingIn = true
     setTimeout(()=>{
      this.signingIn = false
     },3000)
    this.auth.isAuthenticated()
    this.auth.submit(login)
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.boolean$.subscribe(value => {
      this.signingIn = value;
    });
  }

  // @ViewChild('register') registerForm:any;

  passwordType:any = 'password';

  showHidePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  signingIn:any=false

  loginUser(login:any){
    this.signingIn = true
    this.auth.isAuthenticated()
    this.auth.submit(login)
  }
}

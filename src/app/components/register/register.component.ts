import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{

  constructor(private http:HttpClient,private _snackBar: MatSnackBar,private router: Router) { }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:2000
    });
  }

  // private apiUrl = 'https://shopify-x81t.onrender.com/register'; harshith.d@abilioit
  private apiUrl = 'https://shopify-backend-ah7e.onrender.com/register'
  // private apiUrl = 'http://localhost:8000/register'
  passwordType:any = 'password';

  showHidePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  signingUp:any = false

  submit(register:any) {

    this.signingUp = true
    
    console.log('form submitted');
    this.http.post<any>(`${this.apiUrl}`, register.value)
      .subscribe(
        response => {
          if(response.status===200){
            this.openSnackBar(response.message,"close");
            this.signingUp = false
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.log(error.error.message)
          this.openSnackBar(error.error.message,"close");
          this.signingUp = false
        }
      );
  }

}

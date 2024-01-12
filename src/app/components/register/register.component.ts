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

  private apiUrl = 'https://shopify-x81t.onrender.com/register';
  passwordType:any = 'password';

  showHidePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  submit(register:any) {
    console.log('form submitted');
    this.http.post<any>(`${this.apiUrl}`, register.value)
      .subscribe(
        response => {
          if(response.status===200){
            this.openSnackBar(response.message,"close");
            this.router.navigate(['/login']);
          }
        },
        error => {
          this.openSnackBar(error.error.message,"close");
        }
      );
      // this.registerForm.setValue({
      //   username:"",
      //   email:"",
      //   password:""
      // })
  }

}

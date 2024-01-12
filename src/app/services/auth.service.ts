// auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar,private router: Router){
  }
  
  private tokenKey = 'token';
  private apiUrl = 'https://shopify-x81t.onrender.com/login';

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:2000
    });
  }

  submit(login:any) {
    console.log('form submitted');
    console.log(login)
    this.http.post<any>(`${this.apiUrl}`, login.value)
      .subscribe(
        response => {
          if(response.status===200){
            this.openSnackBar(response.message,"close");
            console.log(response.token)
            localStorage.setItem(this.tokenKey,response.token);
            this.router.navigate(['/products']);            
          }
        },
        error => {
          this.openSnackBar(error.error.message,"close")
        }
      );
  }

  logout(): void {
    // Simulated logout logic
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated by verifying the presence of the token
    return !!localStorage.getItem(this.tokenKey);
  }

  getAuthToken(): string | null {
    // Retrieve the authentication token from local storage
    return localStorage.getItem(this.tokenKey);
  }
}

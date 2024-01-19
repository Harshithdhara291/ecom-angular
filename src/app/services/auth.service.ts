// auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar,private router: Router){
  }
  
  private tokenKey = 'token';
  // private apiUrl = 'https://shopify-x81t.onrender.com/login'; harshith.d@abilioit.com

  private apiUrl = 'https://shopify-backend-ah7e.onrender.com/login'
  // private apiUrl = 'http://localhost:8000/login';

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
    });
  }

  private booleanSubject = new BehaviorSubject<boolean>(false);
  boolean$ = this.booleanSubject.asObservable();

  setBooleanValue(value: boolean): void {
    this.booleanSubject.next(value);
  }

  submit(login:any) {
    console.log('form submitted');
    console.log(login)
    this.http.post<any>(`${this.apiUrl}`, login.value)
      .subscribe(
        response => {
          if(response.status===200){
            this.openSnackBar(response.message,"close");
            this.setBooleanValue(false);
            console.log(response)
            localStorage.setItem("userId",response.exists._id);
            localStorage.setItem(this.tokenKey,response.token);
            this.router.navigate(['/products']);            
          }
        },
        error => {
          console.log(error.error.message)
          this.openSnackBar(error.error.message,"close")
          this.setBooleanValue(false);
        }
      );
  }

  logout(): void {
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

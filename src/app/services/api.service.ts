import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:2000
    });
  }

  fetchData(): Observable<any> {
    return  this.http.get<any>('https://shopify-backend-ah7e.onrender.com/products');
    // return  this.http.get<any>('http://localhost:8000/products');

  }

  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  userId:any = localStorage.getItem("userId")

  fetchCartItems() : void {
    this.http.get<any>(`https://shopify-backend-ah7e.onrender.com/myCart/${this.userId}`).subscribe((items) => {
    // this.http.get<any>(`http://localhost:8000/myCart/${this.userId}`).subscribe((items) => {
      this.cartSubject.next(items)
    })
  } 

  addItemToCart(itemId: number): void {
        // this.http.post<any>(`http://localhost:8000/addtocart/${this.userId}`, {"productId":itemId})
    this.http.post<any>(`https://shopify-backend-ah7e.onrender.com/addtocart/${this.userId}`, {"productId":itemId})
    .subscribe(
      response => {
        if(response.error){
          console.log(response.error)
          this.openSnackBar(response.error, "close")
        } else{
          console.log(response.message)
          this.openSnackBar(response.message, "close")
        }

      },
      error => {
        console.log(error.error)
        this.openSnackBar(error.error, "close")
      }
    );
  }

  removeItemFromCart(itemId: number): void {
        // this.http.delete<any>(`http://localhost:8000/removefromcart/${this.userId}/${itemId}`)
    this.http.delete<any>(`https://shopify-backend-ah7e.onrender.com/removefromcart/${this.userId}/${itemId}`)
      .subscribe(
        response => {
            console.log(response.message)
        },
        error => {
          console.log(error.error)
        }
      );
      this.fetchCartItems()
  }

  
  

  private searchInputSubject = new BehaviorSubject<string>('');
  searchInput$ = this.searchInputSubject.asObservable();

  private searchedProductsListSubject = new BehaviorSubject<string[]>([]);
  searchedProductsList$ = this.searchedProductsListSubject.asObservable();
  private cartItems: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  
  updateSearchInput(searchInput: string): void {
    this.searchInputSubject.next(searchInput);
  }

  updateSearchedProductsList(searchedProductsList: string[]): void {
    this.searchedProductsListSubject.next(searchedProductsList);
  }


  // getCartItems() {
  //   return this.cartItems.asObservable();
  // }

  
  // removeItemFromCart(itemId: string) {
  //   const currentCart = this.cartItems.value;
  //   const updatedCart = currentCart.filter((item: any) => item._id !== itemId);
  //   this.cartItems.next(updatedCart);
  // }

}

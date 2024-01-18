import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }

  fetchData(): Observable<any> {
    return  this.http.get<any>('https://shopify-backend-ah7e.onrender.com/products');
  }

  userId:any = localStorage.getItem("userId")

  getCartItemsArray() : Observable<any> {
    return  this.http.get<any>(`https://shopify-backend-ah7e.onrender.com/myCart/${this.userId}`);
  }

  // addItemToCart(itemId:any): Observable<any> {
  //   return  this.http.post<any>(`http://localhost:8000/addtocart/${this.userId}`,itemId);
  // }


  // showSnackbar(message: string, config?: MatSnackBarConfig): void {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000,
  //     verticalPosition: 'top', 
  //     ...config,
  //   });
  // }

  
  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:2000
    });
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


  getCartItems() {
    return this.cartItems.asObservable();
  }

  
  removeItemFromCart(itemId: string) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter((item: any) => item._id !== itemId);
    this.cartItems.next(updatedCart);
  }

}

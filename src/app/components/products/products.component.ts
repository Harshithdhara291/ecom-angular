import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private http: HttpClient, private api: ApiService, private _snackBar: MatSnackBar) {
    this.api.searchInput$.subscribe(input => {
      this.searchInput = input;
    });

    this.api.searchedProductsList$.subscribe(products => {
      console.log(products, "list in products")
      this.searchedProductsList = products;
    });
  };


  searchedProductsList: any = [];
  searchInput: any = '';
  sortProductsBy: any = '';

  token: any
  userId: any

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addToCart(item: any) {
    this.token = localStorage.getItem("token");
    this.userId = localStorage.getItem("userId");
    if (this.token === null) {
      this.openSnackBar('Please Login to continue', "X")
    } else {
      console.log(item._id)
      this.http.post<any>(`https://shopify-backend-ah7e.onrender.com/addtocart/${this.userId}`, {"productId":item._id})
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

  }

  sortProducts() {
    if (this.sortProductsBy == 'asc') {
      this.searchedProductsList.sort((a: any, b: any) => a.price - b.price);
    }
    else if (this.sortProductsBy == 'desc') {
      this.searchedProductsList.sort((a: any, b: any) => b.price - a.price)
    }
  }

}

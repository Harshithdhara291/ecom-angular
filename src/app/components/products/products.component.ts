import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor( private api:ApiService, private _snackBar: MatSnackBar ){
    this.api.searchInput$.subscribe(input => {
      this.searchInput = input;
    });

    this.api.searchedProductsList$.subscribe(products => {
      console.log(products,"list in products")
      this.searchedProductsList = products;
    });
  };

  searchedProductsList:any = [];
  searchInput:any='';
  sortProductsBy:any='';

  token:any

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:2000
    });
  }

  addToCart(item:any){
    this.token = localStorage.getItem("token");
    if(this.token===null){
      this.openSnackBar('Please Login to continue',"X")
    } else{
      this.api.addItemToCart(item)
    }
    
   }
    
  sortProducts(){
      if(this.sortProductsBy=='asc'){
        this.searchedProductsList.sort((a:any, b:any) => a.price - b.price);
      }
      else if(this.sortProductsBy=='desc'){
        this.searchedProductsList.sort((a:any, b:any) => b.price - a.price)
      } 
  }

}

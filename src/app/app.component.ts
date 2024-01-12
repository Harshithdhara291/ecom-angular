import { Component,OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private cartService:ApiService, private authService: AuthService, private router:Router, private dialog:MatDialog){
  }

  searchInput:any=''
  searchedProductsList:any=[];
  productsList:any=[]

  updateInput(){
    console.log(this.searchInput)
    this.cartService.updateSearchInput(this.searchInput)
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cart = items;
      this.itemsCount=this.cart.length;
      console.log(this.cart.length,);
    });

    this.cartService.fetchData().subscribe({
      next: (response => {
        this.productsList = response;
        this.searchedProductsList=response;
        this.updateList(this.searchedProductsList)
        console.log(this.searchedProductsList,"spl in oninit app comp")
      }),
      error : (error =>{
        console.log(error)
      })
    })
    this.updateList(this.searchedProductsList)
  }

  updateList(array:any){
    console.log(array,"update list in app")
    this.cartService.updateSearchedProductsList(array)
  }

  searchedProducts(){
    this.searchedProductsList = this.productsList.filter((eachItem:any)=>{
      return eachItem.title.toLowerCase().includes(this.searchInput.toLowerCase())
    })
    console.log(this.searchedProductsList,"after search")
    this.updateInput()
    this.updateList(this.searchedProductsList)
    this.router.navigate(['./products'])
}

  isAuthenticated() : boolean{
    if(this.authService.isAuthenticated()){
      return true
    }else{
      return false
    }
  }

  cart:any=[]
  itemsCount:number=this.cart.length;

  openDialog(){
    this.dialog.open(DialogComponent);
  }
  
}

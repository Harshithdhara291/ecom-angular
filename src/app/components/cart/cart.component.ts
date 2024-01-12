import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: ApiService) { }

  cart: any = [];
  total = 0;

  roundToTwoDecimalPlaces(value: number): number {
    return Number(value.toFixed(2));
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cart = items;
      console.log(this.cart);
    });

    this.totalPriceCal();
  }

  totalPriceCal() {
    this.total = 0;
    this.cart.forEach((each: any) => {
      this.total += each.price * each.quantity;
      this.total = Number(this.total.toFixed(2));
    });
    // return Number(this.total.toFixed(2));
  }

  // removeFromCart(id:any){
  //   console.log(id)
  //   console.log(this.cart.filter((item:any)=>{
  //     item.id!==id
  //   }),"filer")
  //   console.log(this.updatedCart)
  // }

  // Other component logic...

  removeFromCart(itemId: string) {
    this.cartService.removeItemFromCart(itemId);
    this.totalPriceCal();
  }

  changeQuant(param: string, id: number) {
    if (param === 'inc') {
      this.cart.forEach((item: any) => {
        if (item.id === id) {
          item.quantity += 1;
          this.totalPriceCal();
        }
      });
    } else {
      this.cart.forEach((item: any) => {
        if (item.id === id && item.quantity > 1) {
          item.quantity -= 1;
          this.totalPriceCal();
        } else if (item.id === id && item.quantity === 1) {
          this.removeFromCart(item.id);
        }
      });
    }
  }
}

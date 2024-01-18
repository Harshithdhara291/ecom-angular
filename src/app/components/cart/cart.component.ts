import { Component, OnInit , DoCheck} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private http: HttpClient, private cartService: ApiService) { 
  }

  cart: any = [];
  total = 0;

  roundToTwoDecimalPlaces(value: number): number {
    return Number(value.toFixed(2));
  }

  ngOnInit(): void {
      this.getCart()
      this.totalPriceCal();
  }

  // ngDoCheck(): void {
  //     this.getCart()
  // }

  getCart(){
    this.cartService.getCartItemsArray().subscribe((items) => {
      items.forEach((obj: any) => {
        obj["quantity"] = 1;
      });

      this.cart = items;
      console.log(this.cart, "cart items");
    });
  }

  totalPriceCal() {
    this.total = 0;
    this.cart.forEach((each: any) => {
      this.total += each.price * each.quantity;
      this.total = Number(this.total.toFixed(2));
    });
    // return Number(this.total.toFixed(2));
  }

  userId: any

  removeFromCart(itemId: any) {
    this.userId = localStorage.getItem("userId");

    this.http.delete<any>(`https://shopify-backend-ah7e.onrender.com/removefromcart/${this.userId}/${itemId}`)
      .subscribe(
        response => {
            console.log(response.message)
        },
        error => {
          console.log(error.error)
        }
      );
    // this.getCart()
    this.totalPriceCal()
  }

  changeQuant(param: string, id: number) {
    if (param === 'inc') {
      this.cart.forEach((item: any) => {
        if (item._id === id) {
          item.quantity += 1;
          this.totalPriceCal();
        }
      });
    } else {
      this.cart.forEach((item: any) => {
        if (item._id === id && item.quantity > 1) {
          item.quantity -= 1;
          this.totalPriceCal();
        } else if (item._id === id && item.quantity === 1) {
          this.removeFromCart(item._id);
        }
      });
    }
  }
}

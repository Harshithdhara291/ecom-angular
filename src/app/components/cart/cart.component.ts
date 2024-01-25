import { Component, OnInit , DoCheck} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private http: HttpClient, private cartService: ApiService) {}

  cart: any = [];
  total = 0;
  loading:boolean=true

  ngOnInit(): void {
    this.cartService.fetchCartItems()
      this.cartService.cart$.subscribe(cartItems => {
        console.log(cartItems,"cart items")
        this.cart = cartItems;
        this.total=0
        this.cart.forEach((obj: any) => {
          obj["quantity"] = 1;
          this.total+=obj.quantity*obj.price
        });
      });

    
    setTimeout(()=>{
      this.loading=false
    },1000)
  }

  updateOrderedItemsArray(): void {
    this.cartService.updateDataArray(this.cart);
  }

  totalPriceCal() {
    console.log("tpc called")
    this.total = 0;
    this.cart.forEach((each: any) => {
      this.total += each.price * each.quantity;
    });
  }


  removeFromCart(itemId: any) {
    this.cartService.removeItemFromCart(itemId)
    this.cartService.fetchCartItems()
    // this.total = 0;
    // this.cart.forEach((each: any) => {
    //   this.total += each.price * each.quantity;
    // });
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

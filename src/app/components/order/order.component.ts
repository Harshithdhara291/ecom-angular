import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  constructor(public datePipe: DatePipe, private _snackBar: MatSnackBar, private api:ApiService){}

  orderedItems:any = []

  grandTotal:number=0

  ngOnInit(): void {
    this.api.dataArray$.subscribe((data) => {
      console.log(data,"ordered items array");
      this.orderedItems = data
      console.log(this.orderedItems,"ordered items")
      this.orderedItems.forEach((element:any) => {
        this.grandTotal+=element.price*element.quantity
      });
      
    });
  }

  showAddress:boolean=true;

  toggleAddress(){
    this.showAddress = !this.showAddress
  }

  showOrders:boolean=false;

  toggleOrders(){
    this.showOrders = !this.showOrders
  }
 
  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action,{
      duration:2000
    });
  }

  addressArray:any=[]

  submit(form:any) {
    console.log(form);
  
  if(!form.valid){
    this.openSnackBar("Please fill all the details","close")
    form.setValue({
      "fullname":"Harshith Dharavasthu","mobile":"8790149433","streetAddress":"JP colony, Mupkal","city":"Nizamabad","state":"Telangana","postalCode":"503218"
    })
  }else{
    this.addressArray.push(form.value)
    form.setValue({
      "fullname":"","mobile":"","streetAddress":"","city":"","state":"","postalCode":""
    })
  }
}

  orderPlaced:boolean = false;

  addressValues:any={
    fullname:"Harshith Dharavasthu",mobile:"8790149433",streetAddress:"JP colony, Mupkal",city:"Nizamabad",state:"Telangana",postalCode:"503218"
  };

  orderId:any = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  deliveryFee:any = Math.floor(Math.random() * (100 - 60 + 1)) + 60;

  today:any = new Date();
  oneWeekLater:any = new Date(this.today);

  getDelDate(){
    let num = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  this.oneWeekLater.setDate(this.oneWeekLater.getDate() + num);
  const formattedDate = this.datePipe.transform(this.oneWeekLater, 'dd MMM yyyy');
  return formattedDate;
  } 
  
  formattedDate:any
  placeOrderText:boolean=false

  onPlaceOrder(){
    this.placeOrderText=true
    const index = (this.addressArray.length-1)
    this.addressValues = this.addressArray[index]
    this.formattedDate = this.getDelDate()
    console.log(this.formattedDate,"f d")
    
    if(this.grandTotal!==0){
      setTimeout(() => {
        this.placeOrderText = false
        this.orderPlaced = !this.orderPlaced
      }, 2000);
    }
  }

}

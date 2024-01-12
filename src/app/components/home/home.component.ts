import { Component } from '@angular/core';
import * as yourData from '../../data/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data:any;
  categories:any;
  grocery:any;
  clothing:any;
  sports:any;
  electronics:any;
  homekitchen:any;
  
  constructor(){
    this.data = yourData
    this.categories = this.data.categories
    this.grocery = this.data.grocery
    this.clothing = this.data.clothing
    this.sports = this.data.sports
    this.electronics = this.data.electronics
    this.homekitchen = this.data.homekitchen
  }
}

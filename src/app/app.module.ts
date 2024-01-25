import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import {BrowserAnimationsModule} from "@angular/platform-browser-dynamic"
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component'
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CartComponent } from './components/cart/cart.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrderComponent } from './components/order/order.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    DialogComponent,
    NotfoundComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

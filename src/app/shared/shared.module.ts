import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductServiceService } from './services/product-service.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService, AuthGuardService, UserService, CategoryService, ShoppingCartService, ProductServiceService, OrderService
  ]
})
export class SharedModule { }

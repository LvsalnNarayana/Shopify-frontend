import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllSellersComponent } from './all-sellers/all-sellers.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateProductComponent,
    AllUsersComponent,
    AllProductsComponent,
    AllSellersComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

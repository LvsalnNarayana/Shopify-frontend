import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    CreateProductComponent,
    DashboardComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class SellerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { FilterComponent } from './filter/filter.component';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
    FilterComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    FilterComponent,
    FormComponent
  ]
})
export class SharedModule { }

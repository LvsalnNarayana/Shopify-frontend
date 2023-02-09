import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { PremiumComponent } from './premium/premium.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { SecurityComponent } from './security/security.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { WalletComponent } from './wallet/wallet.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    AddressComponent,
    ContactComponent,
    LoginComponent,
    MessageCenterComponent,
    OrdersComponent,
    PaymentsComponent,
    PremiumComponent,
    ProductComponent,
    ProductsComponent,
    SecurityComponent,
    SellerRegistrationComponent,
    SettingsComponent,
    SignupComponent,
    WalletComponent,
    CheckoutComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CartComponent
  ]
})
export class UserModule { }

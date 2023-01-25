import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket/socket.service';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AccountComponent } from './pages/account/account.component';
import { PremiumComponent } from './pages/premium/premium.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { AddressComponent } from './pages/address/address.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MessageCenterComponent } from './pages/message-center/message-center.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    OrdersComponent,
    AccountComponent,
    PremiumComponent,
    PaymentsComponent,
    AddressComponent,
    ContactComponent,
    MessageCenterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports : [
    MaterialModule
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

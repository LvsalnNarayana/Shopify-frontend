import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddressComponent } from './address/address.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { PremiumComponent } from './premium/premium.component';
import { ProductsComponent } from './products/products.component';
import { SecurityComponent } from './security/security.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { WalletComponent } from './wallet/wallet.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'premium', component: PremiumComponent },
  { path: 'address', component: AddressComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'seller-registration', component: SellerRegistrationComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'message-center', component: MessageCenterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

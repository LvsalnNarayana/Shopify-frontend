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
import { ProductComponent } from './product/product.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'orders', canActivate: [AuthGuard], component: OrdersComponent },
  { path: 'premium', canActivate: [AuthGuard], component: PremiumComponent },
  { path: 'address', canActivate: [AuthGuard], component: AddressComponent },
  { path: 'payments', canActivate: [AuthGuard], component: PaymentsComponent },
  { path: 'wallet', canActivate: [AuthGuard], component: WalletComponent },
  { path: 'seller-registration', canActivate: [AuthGuard], component: SellerRegistrationComponent },
  { path: 'message-center', canActivate: [AuthGuard], component: MessageCenterComponent },
  { path: 'settings', canActivate: [AuthGuard], component: SettingsComponent },
  { path: 'security', canActivate: [AuthGuard], component: SecurityComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

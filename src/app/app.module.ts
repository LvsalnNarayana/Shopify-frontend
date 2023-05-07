import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SideNavService } from './services/sidenav/side-nav.service';
import { UserModule } from './pages/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http/http.service';
import { GlobalService } from './services/global.service';
import { AuthService } from './services/handlers/auth.service';
import { UserService } from './services/handlers/user.service';
import { ProductService } from './services/handlers/product.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserModule,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    SocketService,
    SideNavService,
    HttpService,
    GlobalService,
    AuthService,
    UserService,
    ProductService,
    // {
    //   //With this your app will wait to resolve the promise of init() of your UserAuthService.
    //   provide: APP_INITIALIZER,
    //   useFactory: (service: AuthService) => function () { return service.init(); },
    //   deps: [AuthService],
    //   multi: true
    // }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

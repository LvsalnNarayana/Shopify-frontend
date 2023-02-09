import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SideNavService } from './services/sidenav/side-nav.service';
import { UserModule } from './pages/user/user.module';

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
    UserModule
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    SocketService,
    SideNavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ViewChild } from '@angular/core';
import { GlobalService } from './services/global.service';
import { AuthService } from './services/handlers/auth.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SocketService } from './services/socket/socket.service';
import { HttpService } from './services/http/http.service';
import { UserService } from './services/handlers/user.service';
import { ProductService } from './services/handlers/product.service';
// import { MatSidenav } from '@angular/material/sidenav';
// import { SideNavService } from './services/sidenav/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Shopify-frontend';
  // @ViewChild('cart') cart!: MatSidenav
  user_route_checked = false;

  constructor(
    public global: GlobalService,
    private AuthHandler: AuthService,
    private socket: SocketService,
    private http: HttpService,
    private router: Router,
    private user: UserService,
    private product: ProductService
    // private sideNav: SideNavService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((data: any) => {
        if (data.url === '/login') {
          this.user_route_checked = true;
        } else {
          this.user_route_checked = false;
        }
      });
    this.http.get('http://localhost:3001').subscribe(
      (data: any) => {
        if (data.status === 404) {
          window.location.reload();
        } else {
          this.socket.connect();
          this.global.cookie_status.next(true);
          this.global.socket_status.subscribe((status) => {
            if (status === true) {
              this.AuthHandler.CHECK_AUTH_STATUS();
              this.product.GET_PRODUCTS_BY_USER();
              // this.user.POST_CREATE_USER();
            }
          })
        }
      },
      (error) => {
        if (error.status === 404) {
          window.location.reload();
        }
      }
    );
    this.global.address.subscribe((data) => {
      // console.log(data);
    })
  }
  ngAfterViewInit() {
    // this.sideNav.setSideNav(this.cart);
  }
}

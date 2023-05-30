import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';
import { AuthService } from './services/handlers/auth.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SocketService } from './services/socket/socket.service';
import { HttpService } from './services/http/http.service';
import { ProductService } from './services/handlers/product.service';
// import { MatSidenav } from '@angular/material/sidenav';
// import { SideNavService } from './services/sidenav/side-nav.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ViewChild('cart') cart!: MatSidenav
  title = 'Shopify-frontend';
  user_route_checked = false;
  connection_error = false;
  site_loader_status = true;
  seller_route_checked = false;

  constructor(
    public global: GlobalService,
    private AuthHandler: AuthService,
    private socket: SocketService,
    private http: HttpService,
    private router: Router,
    private product: ProductService
    // private sideNav: SideNavService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((data: any) => {
        this.global.is_seller.next(false);
        if (data.url.split('/').slice(1)[0] === 'seller') {
          this.global.is_seller.next(true);
        }
        if (data.url === '/login') {
          this.global.is_seller.next(false);
          this.user_route_checked = true;
        } else {
          this.user_route_checked = false;
        }
      });
    this.http.get('/api').subscribe(
      (data: any) => {
        if (data.status === 404) {
          window.location.reload();
        } else if (data.status === 0) {
          this.connection_error = true;
          this.site_loader_status = false;
        }
        else {
          this.socket.connect();
          this.global.cookie_status.next(true);
          this.global.socket_status.subscribe((status) => {
            if (status === true) {
              this.AuthHandler.CHECK_AUTH_STATUS();
              this.product.GET_PRODUCTS_BY_USER();
              this.site_loader_status = false;
            }
          })
        }
      },
      (error) => {
        // if (error.status === 404) {
        //   window.location.reload();
        // }
      }
    );
  }
  reload() {
    window.location.reload();
  }
  ngAfterViewInit() {
    // this.sideNav.setSideNav(this.cart);
  }
}



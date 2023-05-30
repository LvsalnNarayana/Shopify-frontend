import { Component, } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/handlers/auth.service';
// import { SideNavService } from 'src/app/services/sidenav/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username = '';
  header_auth_status = false;
  is_seller_logged = false;

  constructor(
    // private sideNav: SideNavService,
    private global: GlobalService,
    private AuthHandler: AuthService,
  ) { }

  ngOnInit() {
    this.global.is_seller.subscribe((data: any) => {
      this.is_seller_logged = data;
    })
    this.global.user.subscribe((data: any) => {
      this.username = data?.username;
    });
    this.global.auth_status.subscribe((data: any) => {
      this.header_auth_status = data;
    })
  }

  logout() {
    this.AuthHandler.LOGOUT_USER();
  }
  ngAfterViewInit() { }

  // toggleSidenav() {
  //   this.sideNav.open()
  // }
}

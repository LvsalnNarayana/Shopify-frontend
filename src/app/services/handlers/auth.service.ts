import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { SocketService } from '../socket/socket.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private global: GlobalService,
    private socket: SocketService,
    private user: UserService,
    private router: Router,
    private product: ProductService
  ) { }
  async init(): Promise<any> {
    this.CHECK_AUTH_STATUS();
  }
  CHECK_AUTH_STATUS() {
    this.socket.emit('GET_AUTH_STATUS_REQUEST', {});
    this.socket.listen('GET_AUTH_STATUS_RESPONSE').subscribe((data: any) => {
      this.global.auth_status.next(data.loggedin);
      if (data.loggedin == true) {
        this.user.GET_USER();
        // this.user.POST_USER_CART('6424b4f4050b5b1833e112d4')
        // this.user.POST_USER_CART('643f1988a83aa012f48bcb93')
        // this.user.UPDATE_USER_CART_ITEM('6424b4f4050b5b1833e112d4','INCREMENT')
        // this.user.UPDATE_USER({ username: "test_user8", mobile: "0000000000" })
        this.user.GET_USER_CART();
        this.user.GET_USER_ORDER();
        this.user.GET_USER_WISHLIST();
        this.user.GET_USER_SETTINGS();
        this.user.GET_USER_PAYMENTS();
        this.user.GET_USER_ADDRESS();
      }
    })
  };
  LOGIN_USER(user: any) {
    this.socket.emit('LOGIN_USER_REQUEST', user);
    this.socket.listen('LOGIN_USER_RESPONSE').subscribe((data: any) => {
      if (data.status === 200) {
        this.global.auth_status.next(true);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });;
      }
    });
  };
  LOGOUT_USER() {
    this.socket.emit('LOGOUT_USER_REQUEST', {});
    this.socket.listen('LOGOUT_USER_RESPONSE').subscribe((data: any) => {
      if (data.status === 200) {
        this.global.auth_status.next(false);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });;
      }
    });
  };
}

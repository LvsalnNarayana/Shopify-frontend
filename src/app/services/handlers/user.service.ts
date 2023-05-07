import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private socket: SocketService,
    private global: GlobalService,
  ) { }

  POST_CREATE_USER() {
    this.socket.emit('POST_CREATE_USER_REQUEST', {});
    this.socket.listen('POST_CREATE_USER_RESPONSE').subscribe((data: any) => {
      console.log(data);
    });
  }

  GET_USER() {
    this.socket.emit('GET_USER_REQUEST', {});
    this.socket.listen('GET_USER_RESPONSE').subscribe((data: any) => {
      this.global.user.next(data);
    });
  }

  VERIFY_USER() {
    this.socket.emit('VERIFY_USER_REQUEST', {});
    this.socket.listen('VERIFY_USER_RESPONSE').subscribe((data: any) => {
      console.log(data)
    });
  }

  UPDATE_USER(data: any) {
    this.socket.emit('UPDATE_USER_REQUEST', data);
    this.socket.listen('UPDATE_USER_RESPONSE').subscribe((data: any) => {
      console.log(data);
      this.global.user.next(data);
    });
  }

  GET_USER_ORDER() {
    this.socket.emit('GET_USER_ORDER_REQUEST', {});
    this.socket.listen('GET_USER_ORDER_RESPONSE').subscribe((data: any) => {
      this.global.orders.next(data);
    });
  }

  POST_CREATE_ORDER() {
    this.socket.emit('POST_CREATE_ORDER_REQUEST', {});
    this.socket.listen('POST_CREATE_ORDER_RESPONSE').subscribe((data: any) => {
      this.global.orders.next(data);
    });
  }

  GET_USER_CART() {
    this.socket.emit('GET_USER_CART_REQUEST', {});
    this.socket.listen('GET_USER_CART_RESPONSE').subscribe((data: any) => {
      this.global.cart.next(data);
    });
  }

  POST_USER_CART(data: any) {
    this.socket.emit('POST_USER_CART_REQUEST', data);
    this.socket.listen('POST_USER_CART_RESPONSE').subscribe((data: any) => {
      this.global.cart.next(data.cart);
      this.global.product.next(data.product);
    });
  }

  DELETE_USER_CART() {
    this.socket.emit('DELETE_USER_CART_REQUEST', {});
    this.socket.listen('DELETE_USER_CART_RESPONSE').subscribe((data: any) => {
      this.global.cart.next(data);
    });
  }

  UPDATE_USER_CART_ITEM(data: any, operator: any) {
    this.socket.emit('UPDATE_USER_CART_ITEM_REQUEST', { data, operator });
    this.socket.listen('UPDATE_USER_CART_ITEM_RESPONSE').subscribe((data: any) => {
      this.global.cart.next(data);
    });
  }

  DELETE_USER_CART_ITEM(data: any) {
    this.socket.emit('DELETE_USER_CART_ITEM_REQUEST', data);
    this.socket.listen('DELETE_USER_CART_ITEM_RESPONSE').subscribe((data: any) => {
      this.global.cart.next(data);
    });
  }

  GET_USER_WISHLIST() {
    this.socket.emit('GET_USER_WISHLIST_REQUEST', {});
    this.socket.listen('GET_USER_WISHLIST_RESPONSE').subscribe((data: any) => {
      this.global.wishlist.next(data);
    });
  }

  MOVE_TO_WISHLIST() {
    this.socket.emit('MOVE_TO_WISHLIST_REQUEST', {});
    this.socket.listen('MOVE_TO_WISHLIST_RESPONSE').subscribe((data: any) => {
      this.global.wishlist.next(data);
    });
  }

  DELETE_WHISHLIST_PRODUCT() {
    this.socket.emit('DELETE_WHISHLIST_PRODUCT_REQUEST', {});
    this.socket
      .listen('DELETE_WHISHLIST_PRODUCT_RESPONSE')
      .subscribe((data: any) => {
        this.global.wishlist.next(data);
      });
  }

  GET_USER_SETTINGS() {
    this.socket.emit('GET_USER_SETTINGS_REQUEST', {});
    this.socket.listen('GET_USER_SETTINGS_RESPONSE').subscribe((data: any) => {
      this.global.settings.next(data);
    });
  }

  POST_USER_SETTINGS() {
    this.socket.emit('POST_USER_SETTINGS_REQUEST', {});
    this.socket
      .listen('POST_USER_SETTINGS_RESPONSE')
      .subscribe((data: any) => {
        this.global.settings.next(data);
      });
  }

  GET_USER_PAYMENTS() {
    this.socket.emit('GET_USER_PAYMENTS_REQUEST', {});
    this.socket.listen('GET_USER_PAYMENTS_RESPONSE').subscribe((data: any) => {
      const default_payment = data.filter((address: any) => {
        return address.default_payment == true;
      });
      this.global.default_payment.next(default_payment[0]);
      this.global.payments.next(data);
    });
  }
  ADD_NEW_PAYMENT(data: any) {
    this.socket.emit('ADD_NEW_PAYMENT_REQUEST', data);
    this.socket.listen('ADD_NEW_PAYMENT_RESPONSE').subscribe((data: any) => {
      this.global.payments.next(data);
    });
  }
  UPDATE_USER_PAYMENT(data: any) {
    this.socket.emit('UPDATE_USER_PAYMENT_REQUEST', data);
    this.socket
      .listen('UPDATE_USER_PAYMENT_RESPONSE')
      .subscribe((data: any) => {
        this.global.payments.next(data);
      });
  }

  DELETE_USER_PAYMENT(paymentId: any) {
    this.socket.emit('DELETE_USER_PAYMENT_REQUEST', paymentId);
    this.socket
      .listen('DELETE_USER_PAYMENT_RESPONSE')
      .subscribe((data: any) => {
        this.global.payments.next(data);
      });
  }

  GET_USER_ADDRESS() {
    this.socket.emit('GET_USER_ADDRESS_REQUEST', {});
    this.socket.listen('GET_USER_ADDRESS_RESPONSE').subscribe((data: any) => {
      const default_address = data.filter((address: any) => {
        return address.is_default == true;
      });
      this.global.default_address.next(default_address[0]);
      this.global.address.next(data);
    });
  }

  ADD_NEW_ADDRESS(data: any) {
    this.socket.emit('ADD_NEW_ADDRESS_REQUEST', data);
    this.socket.listen('ADD_NEW_ADDRESS_RESPONSE').subscribe((data: any) => {
      const default_address = data.filter((address: any) => {
        return address.is_default == true;
      });
      this.global.default_address.next(default_address[0]);
      this.global.address.next(data);
    });
  }

  UPDATE_USER_ADDRESS(data: any) {
    this.socket.emit('UPDATE_USER_ADDRESS_REQUEST', data);
    this.socket
      .listen('UPDATE_USER_ADDRESS_RESPONSE')
      .subscribe((data: any) => {
        const default_address = data.filter((address: any) => {
          return address.is_default == true;
        });
        this.global.default_address.next(default_address[0]);
        this.global.address.next(data);
      });
  }

  DELETE_USER_ADDRESS(addressId: any) {
    this.socket.emit('DELETE_USER_ADDRESS_REQUEST', addressId);
    this.socket
      .listen('DELETE_USER_ADDRESS_RESPONSE')
      .subscribe((data: any) => {
        this.global.address.next(data);
      });
  }

  SET_DEFAULT_ADDRESS(addressId: any) {
    this.socket.emit('SET_DEFAULT_ADDRESS_REQUEST', addressId);
    this.socket
      .listen('SET_DEFAULT_ADDRESS_RESPONSE')
      .subscribe((data: any) => {
        const default_address = data.filter((address: any) => {
          return address.is_default == true;
        });
        this.global.default_address.next(default_address[0]);
        this.global.address.next(data);
      });
  }

  UPDATE_USER_MEMBERSHIP() {
    this.socket.emit('UPDATE_USER_MEMBERSHIP_REQUEST', {});
    this.socket
      .listen('UPDATE_USER_MEMBERSHIP_RESPONSE')
      .subscribe((data: any) => { console.log(data) });
  }
}

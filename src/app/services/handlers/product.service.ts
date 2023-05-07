import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private socket: SocketService,
    private global: GlobalService
  ) { }

  GET_PRODUCTS_BY_USER() {
    this.socket.emit('GET_PRODUCTS_REQUEST', {});
    this.socket.listen('GET_PRODUCTS_RESPONSE').subscribe((data: any) => {
      this.global.products.next(data);
    });
  }
  GET_PRODUCTS_BY_ID(productId: any) {
    this.socket.emit('GET_PRODUCTS_BY_ID_REQUEST', { productId });
    this.socket.listen('GET_PRODUCTS_BY_ID_RESPONSE').subscribe((data: any) => {
      this.global.product.next(data);
    });
  }
}

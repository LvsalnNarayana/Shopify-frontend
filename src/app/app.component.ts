import { Component } from '@angular/core';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopify-frontend';
  constructor(
    private socket: SocketService
  ) {
    // this.socket.connect();
    // // this.socket.emit('POST_CREATE_USER' , "wow");
    // this.socket.emit('GET_USER_REQUEST', "63cf30669b0e24ff1cf0c04c");
    // this.socket.emit('GET_USER_CART_REQUEST', "63cf30669b0e24ff1cf0c04c");
    // this.socket.listen('GET_USER_RESPONSE').subscribe((data) => {
    //   console.log(data);
    // });
    // this.socket.listen('GET_USER_CART_RESPONSE').subscribe((data) => {
    //   console.log(data);
    // });
  }
}

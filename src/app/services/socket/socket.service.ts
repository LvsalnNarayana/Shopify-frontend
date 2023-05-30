import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';
import { GlobalService } from '../global.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;
  admin_socket!: Socket;
  constructor(
    private global: GlobalService,
  ) { }
  connect() {
    this.socket = io({
      path: '/api',
      withCredentials: true
    });
    this.socket.on("connect", () => {
      this.global.socket_status.next(true);
      this.global.socket_id.next(this.socket.id);
    });
    // this.admin_socket = io('http://localhost:3001/admin', {
    //   withCredentials: true,
    //   reconnection: false,
    // });
  }
  listen(eventName: string) {
    return new Observable((Subscriber: any) => {
      this.socket?.on(eventName, (data: any) => {
        Subscriber.next(data)
      });
    })
  }
  emit(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }
}

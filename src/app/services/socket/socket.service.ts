import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;
  admin_socket!: Socket;
  constructor() { }
  connect() {
    this.socket = io('http://localhost:3001/', {
      withCredentials: true,
      reconnection: false,
    });
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
    // this.admin_socket = io('http://localhost:3001/admin', {
    //   withCredentials: true,
    //   reconnection: false,
    // });
    // this.admin_socket.on("connect", () => {
    //   console.log(this.admin_socket.id);
    // });
  }
  listen(eventName: string) {
    return new Observable((Subscriber: any) => {
      this.socket?.on(eventName, (data: any) => {
        Subscriber.next(data)
      })
    })
  }
  emit(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }
}

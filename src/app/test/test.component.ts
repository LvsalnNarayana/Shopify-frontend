import { Component } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  socket_id: String = '';
  constructor(
    private socket: SocketService,
  ) {
    this.socket.connect();
    this.socket.listen('connected').subscribe((data: String | any) => {
      this.socket_id = data;
    });
  }
}

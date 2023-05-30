import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login_auth_status = false;
  username = '';

  constructor(
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.global.auth_status.subscribe((data: any) => {
      this.login_auth_status = data;
    });
    this.global.user.subscribe((data: any) => {
      this.username = data?.username;
      console.log(this.username);
      console.log(this.login_auth_status);

    })
  }
}

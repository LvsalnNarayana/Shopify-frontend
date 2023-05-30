import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, ReplaySubject, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  cookie_status = new ReplaySubject(1);
  socket_status = new ReplaySubject(1);
  is_seller = new ReplaySubject(1);
  products = new ReplaySubject(1);
  product = new ReplaySubject(1);
  auth_status = new ReplaySubject(1);
  socket_id = new BehaviorSubject('');
  user: any = new ReplaySubject(1);
  payments = new ReplaySubject(1);
  address = new ReplaySubject(1);
  default_address = new ReplaySubject(1);
  default_payment = new ReplaySubject(1);
  wishlist = new ReplaySubject(1);
  cart: any = new ReplaySubject(1);
  orders: any = new ReplaySubject(1);
  settings: any = new ReplaySubject(1);

  constructor(
    private router: Router
  ) { }
}

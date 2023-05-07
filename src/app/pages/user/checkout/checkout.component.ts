import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/handlers/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cart_data: any = [];
  cart_items: any = 0;
  cart_total: any = 0;
  address: any = [];
  default_address: any = {};
  payments: any = [];
  default_payment: any = {};
  constructor(
    private global: GlobalService,
    private user: UserService,
    private router: Router
  ) { }
  ngOnInit() {
    this.global.cart.subscribe((data: any) => {
      if (data.products.length < 1) {
        this.router.navigateByUrl('/cart')
      }
      this.cart_data = data.products;
      this.cart_total = data.total;
      this.cart_items = data.products.reduce((total: any, data: any) => {
        return total + data.quantity;
      }, 0);
    });
    this.global.default_address.subscribe((data: any) => {
      this.default_address = data
    });
    this.global.address.subscribe((data: any) => {
      this.address = data;
    });
    this.global.payments.subscribe((data: any) => {
      this.payments = data;
    });
    this.global.default_payment.subscribe((data: any) => {
      this.default_payment = data
    });
  }
  update_cart_quantity(data: any, operator: any) {
    this.user.UPDATE_USER_CART_ITEM(data, operator);
  }
  public checkout_state = {
    step_1: false,
    step_2: false,
    step_3: true
  };
  change_step_state(state: Number) {
    switch (state) {
      case 1:
        this.checkout_state = {
          step_1: true,
          step_2: false,
          step_3: false
        }
        break;
      case 2:
        this.checkout_state = {
          step_1: false,
          step_2: true,
          step_3: false
        }
        break;
      case 3:
        this.checkout_state = {
          step_1: false,
          step_2: false,
          step_3: true
        }
        break;
      default:
        this.checkout_state = {
          step_1: false,
          step_2: false,
          step_3: true
        }
        break;
    }
  }
  default_step_state() {
    this.checkout_state = {
      step_1: false,
      step_2: false,
      step_3: true
    };
  }
  calc_product_total(variation_value: any, color_value: any) {
    return (parseFloat(variation_value) + parseFloat(color_value)).toFixed(2)
  }
}

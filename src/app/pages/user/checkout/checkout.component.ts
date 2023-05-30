import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  checkout_address: any = {};
  payments: any = [];
  checkout_payment: any = {};
  checkout_data: any = {};
  address_form!: FormGroup;
  payment_form!: FormGroup;
  constructor(
    private global: GlobalService,
    private user: UserService,
    private router: Router
  ) { }
  ngOnInit() {
    this.address_form = new FormGroup({
      'address': new FormControl(null)
    });
    this.address_form.get('address')?.valueChanges.subscribe((data) => {
      this.checkout_address = this.address?.filter((address: any) => {
        return address._id == data;
      })[0];
      this.checkout_data['addressId'] = this.checkout_address._id;
    });
    this.payment_form = new FormGroup({
      'payment': new FormControl(null)
    });
    this.payment_form.get('payment')?.valueChanges.subscribe((data) => {
      this.checkout_payment = this.payments?.filter((payment: any) => {
        return payment.id == data;
      })[0];
      this.checkout_data['paymentId'] = this.checkout_payment.id;
    });
    this.global.cart.subscribe((data: any) => {
      if (data.products.length < 1) {
        this.router.navigateByUrl('/cart')
      }
      this.cart_data = data.products;
      this.cart_total = data.total;
      this.cart_items = data.products.reduce((total: any, data: any) => {
        return total + data.quantity;
      }, 0);
      this.checkout_data['products'] = this.cart_data.map((data: any) => {
        return { productId: data?.id, variationId: data?.variations?._id, colorId: data?.variations?.colors?.name, quantity: data.quantity }
      });
      this.checkout_data['total'] = this.cart_total;
    });
    this.global.address.subscribe((data: any) => {
      this.address = data;
      const checkout_default_address = data.filter((address: any) => {
        return address.is_default == true;
      });
      this.checkout_address = checkout_default_address[0];
      this.checkout_data?.['addressId'] === undefined ? this.address_form?.get('address')?.setValue(this.checkout_address._id) : null;
    });
    this.global.payments.subscribe((data: any) => {
      this.payments = data;
      const checkout_default_payment = data.filter((address: any) => {
        return address.default_payment == true;
      });
      this.checkout_payment = checkout_default_payment[0];
      this.checkout_data?.['paymentId'] === undefined ? this.payment_form?.get('payment')?.setValue(this.checkout_payment.id) : null;
    });
  };
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
  place_order() {
    this.user.POST_CREATE_ORDER(this.checkout_data)
  }

}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/handlers/auth.service';
import { UserService } from 'src/app/services/handlers/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  host: {
    'class': 'w-100'
  }
})
export class FormComponent {
  @Input() form_component: String | undefined;
  @Input() dialog!: MatDialog;
  @Input() address_data: any;
  @Input() payment_data: any;
  login_form!: FormGroup;
  add_edit_address!: FormGroup;
  add_edit_payment!: FormGroup;
  billing_address: any = {};

  constructor(
    private AuthHandler: AuthService,
    private user: UserService,
    private formBuilder: FormBuilder,
    // private global: GlobalService
  ) { }

  ngOnInit() {
    // this.global
    this.login_form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
    this.add_edit_address = new FormGroup({
      'name': new FormControl(this.address_data?.name ? this.address_data.name : ''),
      'phone': new FormControl(this.address_data?.phone ? this.address_data.phone : ''),
      'line1': new FormControl(this.address_data?.line1 ? this.address_data.line1 : ''),
      'line2': new FormControl(this.address_data?.line2 ? this.address_data.line2 : ''),
      'city': new FormControl(this.address_data?.city ? this.address_data.city : ''),
      'country': new FormControl(this.address_data?.country ? this.address_data.country : ''),
      'postcode': new FormControl(this.address_data?.postcode ? this.address_data.postcode : ''),
    });
    this.add_edit_payment = new FormGroup({
      'payee_name': new FormControl(this.payment_data?.payee_name ? this.payment_data?.payee_name : ''),
      'card_expiry': new FormControl(this.payment_data?.card_expiry ? this.payment_data?.card_expiry : ''),
    });
    if (this.payment_data == null && this.payment_data == undefined) {
      this.add_edit_payment.addControl('card_number', this.formBuilder.control(''))
    } else {
      this.add_edit_payment.removeControl('card_number')
    }
  }
  login() {
    const data = {
      email: this.login_form.value?.email,
      password: this.login_form.value?.password,
    };
    this.AuthHandler.LOGIN_USER(data);
  }
  add_edit_address_submit() {
    const data = {
      name: this.add_edit_address.get('name')?.value,
      phone: this.add_edit_address.get('phone')?.value,
      line1: this.add_edit_address.get('line1')?.value,
      line2: this.add_edit_address.get('line2')?.value,
      city: this.add_edit_address.get('city')?.value,
      country: this.add_edit_address.get('country')?.value,
      postcode: this.add_edit_address.get('postcode')?.value,
    }
    if (this.address_data !== null && this.address_data !== undefined) {
      this.user.UPDATE_USER_ADDRESS({ addressId: this.address_data._id, new_address: { ...data }, is_default: this.address_data.is_default });
    } else {
      this.user.ADD_NEW_ADDRESS(data);
    }
    this.dialog.closeAll();
  }
  add_edit_payment_submit() {
    const data = {
      payee_name: this.add_edit_payment.get('payee_name')?.value,
      card_expiry: this.add_edit_payment.get('card_expiry')?.value,
    }
    if (this.payment_data !== null && this.payment_data !== undefined) {
      this.user.UPDATE_USER_PAYMENT({ paymentId: this.payment_data.id, updated_payment: data });
    } else {
      this.user.ADD_NEW_PAYMENT({ ...data, card_number: this.add_edit_payment.get('card_number')?.value, type: "VISA" });
    }
    this.dialog.closeAll();
  }
  close_dialog(e: Event) {
    e.preventDefault();
    this.dialog.closeAll();
  }

}

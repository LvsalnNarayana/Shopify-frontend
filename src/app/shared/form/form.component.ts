import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/handlers/auth.service';
import { UserService } from 'src/app/services/handlers/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  host: {
    class: 'w-100',
  },
})
export class FormComponent {

  @Input() form_component: String | undefined;
  @Input() dialog!: MatDialog;
  @Input() address_data: any;
  @Input() payment_data: any;
  @Output() Test_event = new EventEmitter();

  specification_control: any = {
    specification_key: '',
    specification_value: '',
    specification_category: '',
    show_specification: false,
    show_specification_category: false,
    specification: {},
    check_specification_key: true,
    edit_specification_status: false
  }
  specifications = [];
  // specification_key = '';
  // specification_value = '';
  // specification_category = '';
  // show_specification = false;
  // show_specification_category = false;
  // specification: any = {};
  // check_specification_key = true;

  login_form!: FormGroup;
  add_edit_address!: FormGroup;
  add_edit_payment!: FormGroup;
  product_form_step_1!: FormGroup;

  constructor(
    private AuthHandler: AuthService,
    private user: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.product_form_step_1 = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'brand_name': new FormControl('', [Validators.required]),
      'country_of_origin': new FormControl('', [Validators.required]),
      'manufacturer': new FormControl('', [Validators.required]),
      'specifications': new FormArray([])
    });
    this.specifications = this.product_form_step_1?.get('specifications')?.value;
    this.login_form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.add_edit_address = new FormGroup({
      name: new FormControl(
        this.address_data?.name ? this.address_data.name : ''
      ),
      phone: new FormControl(
        this.address_data?.phone ? this.address_data.phone : ''
      ),
      line1: new FormControl(
        this.address_data?.line1 ? this.address_data.line1 : ''
      ),
      line2: new FormControl(
        this.address_data?.line2 ? this.address_data.line2 : ''
      ),
      city: new FormControl(
        this.address_data?.city ? this.address_data.city : ''
      ),
      country: new FormControl(
        this.address_data?.country ? this.address_data.country : ''
      ),
      postcode: new FormControl(
        this.address_data?.postcode ? this.address_data.postcode : ''
      ),
    });
    this.add_edit_payment = new FormGroup({
      payee_name: new FormControl(
        this.payment_data?.payee_name ? this.payment_data?.payee_name : ''
      ),
      card_expiry: new FormControl(
        this.payment_data?.card_expiry ? this.payment_data?.card_expiry : ''
      ),
    });
    if (this.payment_data == null && this.payment_data == undefined) {
      this.add_edit_payment.addControl(
        'card_number',
        this.formBuilder.control('')
      );
    } else {
      this.add_edit_payment.removeControl('card_number');
    }
    this.product_form_step_1.valueChanges.subscribe((data) => {
      if (Object.keys(this.getAllErrors()).length > 0) {
        this.product_form_step_1.setErrors(this.getAllErrors())
        this.Test_event.emit('ERROR')
      } else if (Object.keys(this.getAllErrors()).length === 0 && this.product_form_step_1.invalid) {
        this.product_form_step_1.setErrors(null);
        this.Test_event.emit('NOERROR')
      } else if (!this.product_form_step_1.invalid) {
        this.Test_event.emit('CHECKED')
      }
    })
  }
  getAllErrors(): any {
    const errors: any = {};
    Object.keys(this.product_form_step_1.controls).forEach(key => {
      const controlErrors = this.product_form_step_1?.get(key)?.errors;
      const controlTouched = this.product_form_step_1?.get(key)?.touched;
      if (controlErrors && controlTouched) {
        errors[key] = controlErrors;
      }
    });
    return errors;
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
      is_default: this.address_data?.is_default,
    };
    if (this.address_data !== null && this.address_data !== undefined) {
      this.user.UPDATE_USER_ADDRESS({
        addressId: this.address_data._id,
        new_address: { ...data },
      });
    } else {
      this.user.ADD_NEW_ADDRESS(data);
    }
    this.dialog.closeAll();
  }
  add_edit_payment_submit() {
    const data = {
      payee_name: this.add_edit_payment.get('payee_name')?.value,
      card_expiry: this.add_edit_payment.get('card_expiry')?.value,
    };
    if (this.payment_data !== null && this.payment_data !== undefined) {
      this.user.UPDATE_USER_PAYMENT({
        paymentId: this.payment_data.id,
        updated_payment: data,
      });
    } else {
      this.user.ADD_NEW_PAYMENT({
        ...data,
        card_number: this.add_edit_payment.get('card_number')?.value,
        type: 'VISA',
      });
    }
    this.dialog.closeAll();
  }
  close_dialog(e: Event) {
    e.preventDefault();
    this.dialog.closeAll();
  }



  cancel_specification(value: any) {
    if (value === 'specification_category') {
      this.specification_control.show_specification_category = false;
      this.specification_control.specification_category = '';
    } else if (value = 'specification_value') {
      this.specification_control.show_specification = false;
      this.specification_control.specification_key = '';
      this.specification_control.specification_value = '';
    }
  }
  save_specification_category() {
    const specifications = this.product_form_step_1.get('specifications') as FormArray;
    const temp_form_group = new FormGroup({});
    Object.keys(this.specification_control.specification).map((key) => {
      temp_form_group.addControl(key, new FormControl(this.specification_control.specification[key]));
    });
    this.specification_control.specification = {};
    const specification_category_object: any = {};
    specification_category_object[this.specification_control.specification_category] = temp_form_group;
    specifications.push(new FormGroup(specification_category_object));
    this.specifications = this.product_form_step_1?.get('specifications')?.value;
    this.specification_control.specification_category = '';
    this.specification_control.show_specification_category = false;
    this.specification_control.specification_key = '';
    this.specification_control.specification_value = '';
    this.specification_control.show_specification = false;
    this.specification_control.edit_specification_status = false;
  }
  add_sepcification() {
    this.specification_control.show_specification = false;
    let temp_specification: any = {}
    temp_specification[this.specification_control.specification_key] = this.specification_control.specification_value;
    this.specification_control.specification = { ...this.specification_control.specification, ...temp_specification }
    this.specification_control.specification_key = '';
    this.specification_control.specification_value = '';
  }
  edit_specification(value: any) {
    this.specification_control.edit_specification_status = false;
    const specification_value = this.product_form_step_1.get('specifications')?.value;
    const specification_data = specification_value.filter((new_value: any, i: any) => {
      if (value in new_value) {
        return new_value;
      } else {
        return null
      }
    });

    const specifications = this.product_form_step_1.get('specifications') as FormArray;
    specifications.controls.forEach((control: AbstractControl) => {
      const new_controls = control as FormGroup;
      Object.keys(new_controls?.controls).forEach((data) => {
        new_controls.removeControl(value);
      });
    });
    this.specifications = this.product_form_step_1?.get('specifications')?.value;
    this.specification_control = {
      specification_key: '',
      specification_value: '',
      specification_category: value,
      show_specification: false,
      show_specification_category: true,
      specification: specification_data[0][value],
      check_specification_key: true,
      edit_specification_status: false
    }
  }
  delete_specification(value: any) {
    delete this.specification_control.specification[value];
  }
  test_func(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.add_sepcification()
    }
  }
  check_specification_exists(event: any) {
    this.specification_control.check_specification_key = !(event?.target?.value in this.specification_control.specification);
  }
  getValue(obj: any) {
    return obj;
  }

}

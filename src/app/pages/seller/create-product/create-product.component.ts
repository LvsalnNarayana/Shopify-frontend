import { Component } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  product_form_step_1_status = 'NOERROR';
  new_handler(event: any) {
    console.log(event);
    this.product_form_step_1_status = event;
  }
  set_product_step_status(value: any) {
    switch (value) {
      case 'ERROR':
        return 'assets/images/warning.png';
      case 'CHECKED':
        return 'assets/images/checked.png';
      default:
        return 'assets/images/question.png';
    }
  }
}

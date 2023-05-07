import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ProductService } from 'src/app/services/handlers/product.service';
import { UserService } from 'src/app/services/handlers/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(
    private global: GlobalService,
    private user: UserService,
  ) { }
  cart_data: any = [];
  cart_total: any = 0;
  cart_items: any = 0;
  ngOnInit() {
    this.global.cart.subscribe((data: any) => {
      this.cart_data = data.products;
      this.cart_total = data.total;
      this.cart_items = data.products.reduce((total: any, data: any) => {
        return total + data.quantity;
      }, 0);
    })
  }
  update_cart_quantity(data: any, operator: any) {
    this.user.UPDATE_USER_CART_ITEM(data, operator);
  }
  delete_cart_item(data: any,) {
    this.user.DELETE_USER_CART_ITEM(data);
  }
  calc_product_total(variation_value: any, color_value: any) {
    return (parseFloat(variation_value) + parseFloat(color_value)).toFixed(2)
  }
}

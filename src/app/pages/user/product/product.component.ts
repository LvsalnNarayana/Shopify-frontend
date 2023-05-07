import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ProductService } from 'src/app/services/handlers/product.service';
import { UserService } from 'src/app/services/handlers/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product_data: any = {};
  current_variation: any = 0;
  current_color: any = 0;
  total_value: any = 0;
  default_address:any = {};

  constructor(
    private route: ActivatedRoute,
    private product: ProductService,
    private global: GlobalService,
    private user: UserService
  ) { }
  ngOnInit() {
    this.global.socket_status.subscribe((data) => {
      if (data === true) {
        this.route.params.subscribe((data: any) => {
          this.product.GET_PRODUCTS_BY_ID(data.id);
        })
      }
    });
    this.global.product.subscribe((data: any) => {
      this.product_data = data;
      console.log(this.product_data);

      this.total_value = (parseFloat(data?.variations?.[this.current_variation]?.price['$numberDecimal']) + parseFloat(data?.variations?.[this.current_variation]?.colors?.[this.current_color]?.color_price['$numberDecimal'])).toFixed(2);
    });
    this.global.default_address.subscribe((data:any) => {
      this.default_address = data;
    })
  }
  change_variation(variation_id: any) {
    this.current_variation = variation_id;
    this.total_value = (parseFloat(this.product_data?.variations?.[this.current_variation]?.price['$numberDecimal']) + parseFloat(this.product_data?.variations?.[this.current_variation]?.colors?.[this.current_color]?.color_price['$numberDecimal'])).toFixed(2);
  }
  change_color(color_id: any) {
    this.current_color = color_id;
    this.total_value = (parseFloat(this.product_data?.variations?.[this.current_variation]?.price['$numberDecimal']) + parseFloat(this.product_data?.variations?.[this.current_variation]?.colors?.[this.current_color]?.color_price['$numberDecimal'])).toFixed(2);
  }
  add_to_cart(data: any) {
    this.user.POST_USER_CART(data);
  }
}

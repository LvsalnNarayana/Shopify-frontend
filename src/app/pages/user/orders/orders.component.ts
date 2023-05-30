import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders : any = [] ;
  constructor(
    private global: GlobalService
  ) { }
  ngOnInit() {
    this.global.orders.subscribe((data: any) => {
      console.log(data);

      this.orders = data;
    })
  }
  order_placed(data:any){
    const date = new Date(data)
    return date.getDate()+"-"+date.toLocaleString('default', { month: 'short' })+"-"+date.getFullYear()
  }
  delivery_date(data:any){
    const date = new Date(data)
    return date.getDate()+"-"+date.toLocaleString('default', { month: 'short' })+"-"+date.getFullYear()
  }
  product_title(product_name:any,product_variant_name :any,product_color_name:any){
    return product_name+'('+product_variant_name+') - '+product_color_name
  }
  product_total(variant_price:any,color_price:any){
    return (parseFloat(variant_price['$numberDecimal']) + parseFloat(color_price['$numberDecimal'])).toFixed(2)
  }
}

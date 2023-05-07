import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  inputs: ['data']
})
export class ProductCardComponent {
  @Input('data') data: any;
  total_value:any = 0;
  title = '';
  ngOnInit(){
    this.title = this.data?.title+
    '&nbsp;('+this.data?.variations?.[0]?.name+')&nbsp;-&nbsp;' + this.data?.variations?.[0]?.colors?.[0]?.name;
    console.log(this.title);

    this.total_value = (parseFloat(this.data?.variations?.[0]?.price['$numberDecimal']) + parseFloat(this.data?.variations?.[0]?.colors?.[0]?.color_price['$numberDecimal'])).toFixed(2)
  }
}

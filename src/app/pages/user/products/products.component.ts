import { Component } from '@angular/core';
import { MatChipEvent, MatChipSelectionChange } from '@angular/material/chips';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product_data: any = [];
  constructor(
    private global: GlobalService
  ) { }
  clicked(test: MatChipSelectionChange) {
    console.log(test);
  }
  ngOnInit() {
    this.global.products.subscribe((data) => {
      this.product_data = data;
    })
  }
}

import { Component } from '@angular/core';
import { MatChipEvent, MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  clicked(test : MatChipSelectionChange){
    console.log(test);

  }
}

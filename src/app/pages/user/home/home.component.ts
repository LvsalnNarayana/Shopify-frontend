import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  product_data:any = [];
  constructor(
    private global: GlobalService
  ) { }
  ngOnInit() {
    this.global.products.subscribe((data) => {
      this.product_data = data;
    })
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
// import
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  ngOnInit(){
    console.log("hello");

    console.log(this.trigger?.menu);

  }
  ngAfterViewInit(){
    console.log(this.trigger?.menu);

  }
}



import { Component, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
// import { SideNavService } from 'src/app/services/sidenav/side-nav.service';
// import
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild('megaMenuTrigger') megaMenuTrigger!: MatMenuTrigger;
  enteredButton = false;
  isMatMenuOpen = false;
  constructor(
    // private sideNav: SideNavService
  ) { }
  ngOnInit() { }
  ngAfterViewInit() {
    console.log(this.trigger);
  }
  // toggleSidenav() {
  //   this.sideNav.open()
  // }
}



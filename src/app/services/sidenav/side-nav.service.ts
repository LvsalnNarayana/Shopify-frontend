import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private sidenav!: MatSidenav
  constructor() { }
  public setSideNav(sideNav: MatSidenav) {
    this.sidenav = sideNav;
  }
  public open() {
    return this.sidenav.open();
  }


  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}

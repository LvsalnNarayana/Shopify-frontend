import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/handlers/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
const wiggleAnimation = trigger('wiggleAnimation', [
  state('void', style({
    transform: 'rotate(0deg)'
  })),
  transition(':enter', [
    animate('500ms ease-in-out', style({
      transform: 'rotate(20deg)'
    })),
    animate('500ms ease-in-out', style({
      transform: 'rotate(-20deg)'
    })),
    animate('500ms ease-in-out', style({
      transform: 'rotate(0deg)'
    }))
  ])
]);


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  animations: [wiggleAnimation]
})
export class AddressComponent {
  address: any = [];
  edit_address_object: any;
  @ViewChild('edit_address') edit_address_dialog!: TemplateRef<any>;
  @ViewChild('add_address') add_address_dialog!: TemplateRef<any>;
  constructor(
    private global: GlobalService,
    private user: UserService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.global.address.subscribe((data) => {
      this.address = data;
    });
  }
  add_address_dialog_open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['edit_address_dialog'];
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '80vh';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.add_address_dialog, dialogConfig);
  }
  set_default_address(addressId: any) {
    this.user.SET_DEFAULT_ADDRESS(addressId);
  }
  edit_address_dialog_open(address_index: any) {
    this.edit_address_object = this.address?.[address_index];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['edit_address_dialog'];
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '80vh';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.edit_address_dialog, dialogConfig);
  }
  remove_address(addressId: any) {
    this.user.DELETE_USER_ADDRESS(addressId);
  }
}

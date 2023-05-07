import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/handlers/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  constructor(
    private global: GlobalService,
    public dialog: MatDialog,
    private user: UserService
  ) { };
  @ViewChild('add_payment') add_payemnt_dialog!: TemplateRef<any>;
  @ViewChild('edit_payment') edit_payemnt_dialog!: TemplateRef<any>;
  payments: any = [];
  edit_payment_object: any;
  ngOnInit() {
    const data = {
      payee_name: "Jhon",
      card_number: "1234567890",
      card_expiry: "09/32",
      card_cvv: "455",
      type: 'VISA'
    }
    // this.user.ADD_NEW_PAYMENT(data);
    this.global.payments.subscribe((data) => {
      this.payments = data;
    })
  }
  add_new_payment_dialog_open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['add_payemnt_dialog'];
    dialogConfig.disableClose = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = 'max-content';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.add_payemnt_dialog, dialogConfig);
  }
  edit_payment_dialog_open(payment_index: any) {
    this.edit_payment_object = this.payments?.[payment_index];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['add_payemnt_dialog'];
    dialogConfig.disableClose = true;
    dialogConfig.width = '60vw';
    dialogConfig.height = 'max-content';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.edit_payemnt_dialog, dialogConfig);
  }
  delete_payment(paymentId: any) {
    this.user.DELETE_USER_PAYMENT(paymentId)
  }
}

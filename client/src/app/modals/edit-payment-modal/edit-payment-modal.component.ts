import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-payment-modal',
  templateUrl: './edit-payment-modal.component.html',
  styleUrls: ['./edit-payment-modal.component.css']
})
export class EditPaymentModalComponent implements OnInit {
  username: string;
  balance: number;
  payBill: boolean;
  payStatus: boolean;
  payRent: boolean;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  changePayStatus(e: any) {
    var target = e.target;
    if (target.checked) {
      this.payStatus = true;
    } else {
      this.payStatus = false;
    }
  }

  changePayBill(e: any) {
    var target = e.target;
    if (target.checked) {
      this.payBill = true;
    } else {
      this.payBill = false;
    }
  }

  changePayRent(e: any) {
    var target = e.target;
    if (target.checked) {
      this.payRent = true;
    } else {
      this.payRent = false;
    }
  }
}

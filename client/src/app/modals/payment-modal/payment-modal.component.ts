import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
  id: number = 0
  method: string = '';
  month: string = '';
  payDate: Date | undefined
  amount: number = 0;
  approve = true;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  reject() {
    this.approve = false;
  }
}

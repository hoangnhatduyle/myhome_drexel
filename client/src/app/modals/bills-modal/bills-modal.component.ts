import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bills-modal',
  templateUrl: './bills-modal.component.html',
  styleUrls: ['./bills-modal.component.css']
})
export class BillsModalComponent implements OnInit {
  ID: number = 0;
  type: string = '';
  month: string = '';
  amount: number = 0;
  dueDate: Date = new Date();
  paidDate:  Date = new Date();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.dueDate = new Date(this.dueDate);
    this.paidDate = new Date(this.paidDate);
    this.dueDate = new Date(this.dueDate.getTime() + Math.abs(this.dueDate.getTimezoneOffset()*60000));
    this.paidDate = new Date(this.paidDate.getTime() + Math.abs(this.paidDate.getTimezoneOffset()*60000));
  }
}

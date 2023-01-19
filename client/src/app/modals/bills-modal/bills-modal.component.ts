import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bill } from '../../_models/bill';
import { BillService } from '../../_services/bill.service';

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

  constructor(public bsModalRef: BsModalRef, private billService: BillService) { }

  ngOnInit(): void {
  }
}

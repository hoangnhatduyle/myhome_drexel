import { Component, OnInit } from '@angular/core';
import { BillService } from '../_services/bill.service';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.css']
})
export class BillManagementComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit(): void {
  }

}

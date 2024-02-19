import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/_models/bill';
import { Payment } from 'src/app/_models/payment';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BillService } from 'src/app/_services/bill.service';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  bills: Bill[] = [];
  users: User[] = [];
  pastPayments: Payment[] = [];
  pendingPayments: Payment[] = [];

  constructor(private billService: BillService, private paymentService: PaymentService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadPastPayments();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {
        this.users = users;
      }
    })
  }

  getBills() {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills;
          this.getUsersWithRoles();
        }
      }
    })
  }

  loadPastPayments() {
    this.paymentService.getPastPayments().subscribe({
      next: payments => {
        if (payments) {
          this.pastPayments = payments;
          this.loadPendingPayments();
        }
      }
    })
  }

  loadPendingPayments() {
    this.paymentService.getPendingPayments().subscribe({
      next: payments => {
        if (payments) {
          this.pendingPayments = payments;
          this.getBills();
        }
      }
    })
  }
}

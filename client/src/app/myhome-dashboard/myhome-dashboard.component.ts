import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Bill } from '../_models/bill';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { BillService } from '../_services/bill.service';
import { MembersService } from '../_services/members.service';
import { AdminService } from '../_services/admin.service';
import { FinancialReport } from '../_models/financialReport';

@Component({
  selector: 'app-myhome-dashboard',
  templateUrl: './myhome-dashboard.component.html',
  styleUrls: ['./myhome-dashboard.component.css']
})
export class MyhomeDashboardComponent implements OnInit {
  member: Member | undefined;
  financialReport: FinancialReport[] = [];
  user: User | null = null;
  bills: Bill[] = [];

  date = new Date();
  currYear = this.date.getFullYear();

  constructor(private adminService: AdminService, private accountService: AccountService, private router: Router, private memberService: MembersService, private billService: BillService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember();
    this.getBills();

    if (this.user.roles.includes("Admin")) {
      this.adminService.getFinancialReport(this.currYear).subscribe({
        next: report => {
          this.financialReport = report;
        }
      })
    }
  }

  loadMember(refetch = false) {
    if (!this.user) return;
    this.memberService.getMember(this.user.userName, refetch).subscribe({
      next: member => this.member = member
    })
  }

  getBills(refetch = false) {
    this.billService.getBills(refetch).subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills
        }
      }
    })
  }

  reloadMemberInfo(event: boolean) {
    this.loadMember(true);
    this.getBills(true);

    if (this.user.roles.includes("Admin")) {
      this.adminService.getFinancialReport(this.currYear).subscribe({
        next: report => {
          this.financialReport = report;
        }
      })
    }
  }
}

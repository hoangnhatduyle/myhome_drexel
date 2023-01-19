import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from '../_models/member';
import { Payment } from '../_models/payment';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-recent-payment',
  templateUrl: './recent-payment.component.html',
  styleUrls: ['./recent-payment.component.css']
})
export class RecentPaymentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  isVisible: boolean = true;
  member: Member | undefined;
  user: User | null = null;
  payments: Payment[] = [];

  constructor(private accountService: AccountService, private router: Router,
    private memberService: MembersService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        search: "",
        searchPlaceholder: 'Search...',
      },
      lengthMenu: [
        [5, 10, 25, -1],
        [5, 10, 25, 'All'],
      ]
    };
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next: member => {
        this.member = member
        this.payments = member.payment;
      }
    })
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.loadMember();
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-myhome-dashboard',
  templateUrl: './myhome-dashboard.component.html',
  styleUrls: ['./myhome-dashboard.component.css']
})
export class MyhomeDashboardComponent implements OnInit {
  opened: boolean = true;
  search: boolean = false;
  autoCollapseWidth: number = 800;

  member: Member | undefined;
  user: User | null = null;

  constructor(private accountService: AccountService, private router: Router, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next: member => this.member = member
    })
  }

  toggleOpened(): void {
    this.opened = !this.opened;
  }

  toggleSearch(): void {
    this.search = !this.search;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}

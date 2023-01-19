import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-myhome-nav',
  templateUrl: './myhome-nav.component.html',
  styleUrls: ['./myhome-nav.component.css']
})
export class MyhomeNavComponent implements OnInit {
  opened: boolean = true;
  search: boolean = false;
  autoCollapseWidth: number = 800;

  member: Member | undefined;
  user: User | null = null;

  constructor(public accountService: AccountService, private router: Router, private memberService: MembersService, private titleService: Title, private cdref: ChangeDetectorRef) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
    this.titleService.setTitle("myHOME");
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
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

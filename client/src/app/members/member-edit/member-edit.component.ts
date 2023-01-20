import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('profileTabs', { static: true }) profileTabs?: TabsetComponent;
  member: Member = {} as Member;
  user: User | null = null;

  constructor(private accountService: AccountService, private route: ActivatedRoute, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member']
      }
    })

    this.route.queryParamMap.subscribe({
      next: params => {
        if (params.get('tab')) {
          this.selectTab(params.get('tab'));
        }
      }
    })
  }

  selectTab(heading: string | null) {
    if (this.profileTabs) {
      this.profileTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }
}

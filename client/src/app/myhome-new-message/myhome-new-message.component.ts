import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { NewMessageComponent } from '../modals/new-message/new-message.component';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-myhome-new-message',
  templateUrl: './myhome-new-message.component.html',
  styleUrls: ['./myhome-new-message.component.css']
})
export class MyhomeNewMessageComponent implements OnInit {
  member: Member = {} as Member;
  user: User | null = null;
  bsModalRef: BsModalRef<NewMessageComponent> = new BsModalRef<NewMessageComponent>();

  constructor(private memberService: MembersService, private modalService: BsModalService, private accountService: AccountService) {
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

  openMessageModal(content: string) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        content: content
      }
    }
    this.bsModalRef = this.modalService.show(NewMessageComponent, config);
  }
}

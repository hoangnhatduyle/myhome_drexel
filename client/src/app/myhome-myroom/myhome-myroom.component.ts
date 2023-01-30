import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { take } from 'rxjs';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-myhome-myroom',
  templateUrl: './myhome-myroom.component.html',
  styleUrls: ['./myhome-myroom.component.css']
})
export class MyhomeMyroomComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  members: Member[] = [];
  roomMembers: string[] = [];
  user: User | null = null;
  member: Member | undefined;
  floor: number = 0;

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    this.loadMember()
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembersWithoutUserParam().subscribe({
      next: members => {
        if (members) {
          this.members = members;
          this.roomMembers = this.members.filter(x => x.room.roomNumber == this.member?.room.roomNumber).map(x => x.userName);
        }
      }
    })
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next: member => {
        this.member = member
        this.floor = member.room.roomNumber <= 2 ? 1 : 2;
      }
    })
  }
}

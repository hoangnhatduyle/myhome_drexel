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
    this.loadMember()
    this.loadMembers();

    this.galleryOptions = [
      {
        width: '100%',
        height: '485px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ]
  }

  getImages(roomNumber: number) {
    const imagesUrls: any = [];
    if (roomNumber != 1) return [];
    imagesUrls.push(
      {
        small: '../../assets/images/Room' + roomNumber + '/1.png',
        medium: '../../assets/images/Room' + roomNumber + '/1.png',
        big: '../../assets/images/Room' + roomNumber + '/1.png',
        description: 'Room ' + roomNumber + ' - Image 1'
      },
      {
        small: '../../assets/images/Room' + roomNumber + '/2.png',
        medium: '../../assets/images/Room' + roomNumber + '/2.png',
        big: '../../assets/images/Room' + roomNumber + '/2.png',
        description: 'Room ' + roomNumber + ' - Image 2'
      },
      {
        small: '../../assets/images/Room' + roomNumber + '/3.png',
        medium: '../../assets/images/Room' + roomNumber + '/3.png',
        big: '../../assets/images/Room' + roomNumber + '/3.png',
        description: 'Room ' + roomNumber + ' - Image 3'
      },
      {
        small: '../../assets/images/Room' + roomNumber + '/4.png',
        medium: '../../assets/images/Room' + roomNumber + '/4.png',
        big: '../../assets/images/Room' + roomNumber + '/4.png',
        description: 'Room ' + roomNumber + ' - Image 4'
      }
    )

    return imagesUrls;
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
        this.galleryImages = this.getImages(this.member.room.roomNumber);
      }
    })
  }
}

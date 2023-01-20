import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {
  @ViewChild('roomSelection') roomSelection!: ElementRef;
  members: Member[] = [];
  selectedRoom = '';

  constructor(private memberService: MembersService, private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembersWithoutUserParam().subscribe({
      next: members => {
        if (members) {
          this.members = members;
        }
      }
    })
  }

  onSelected(): void {
    this.selectedRoom = this.roomSelection.nativeElement.value;
    if (this.selectedRoom == "1") {

    }
    else if (this.selectedRoom == "2") {

    }
    else if (this.selectedRoom == "3") {

    }
    else if (this.selectedRoom == "4") {

    }
  }
}

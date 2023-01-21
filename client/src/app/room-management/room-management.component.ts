import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { RoomModalComponent } from '../modals/room-modal/room-modal.component';
import { Member } from '../_models/member';
import { AdminService } from '../_services/admin.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {
  @ViewChild('roomSelection') roomSelection!: ElementRef;
  bsModalRef: BsModalRef<RoomModalComponent> = new BsModalRef<RoomModalComponent>();
  members: Member[] = [];
  selectedMember: Member[] = [];
  selectedRoom = '';

  constructor(private memberService: MembersService, private modalService: BsModalService, private toastr: ToastrService, private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembersWithoutUserParam().subscribe({
      next: members => {
        if (members) {
          this.members = members.sort((a, b) => a.room.roomNumber < b.room.roomNumber ? -1 : a.room.roomNumber > b.room.roomNumber ? 1 : 0);
          this.selectedMember = this.members;
        }
      }
    })
  }

  onSelected(): void {
    this.selectedRoom = this.roomSelection.nativeElement.value;
    if (this.selectedRoom == "1") {
      this.selectedMember = this.members.filter(x => x.room.roomNumber == 1);
    }
    else if (this.selectedRoom == "2") {
      this.selectedMember = this.members.filter(x => x.room.roomNumber == 2);
    }
    else if (this.selectedRoom == "3") {
      this.selectedMember = this.members.filter(x => x.room.roomNumber == 3);
    }
    else if (this.selectedRoom == "4") {
      this.selectedMember = this.members.filter(x => x.room.roomNumber == 4);
    }
    else {
      this.selectedMember = this.members
    }
  }

  openRoomModal(member: Member) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        ID: member.id,
        knownAs: member.knownAs,
        roomNumber: member.room.roomNumber,
        roomType: member.room.roomType
      }
    }
    this.bsModalRef = this.modalService.show(RoomModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const username = member.userName;
        const roomNumber = this.bsModalRef.content!.selectedRoom;
        if (roomNumber == member.room.roomNumber || roomNumber == 0) return;
        this.adminService.changeRoom(username, roomNumber).subscribe({
          next: _ => {
            let roomType = 'Single';
            if (roomNumber > 2) roomType = "Double"
            member.room.roomNumber = roomNumber;
            member.room.roomType = roomType

            const index = this.members.indexOf(member)
            this.selectedMember[index] = { ...this.selectedMember[index], ...member }
            this.toastr.success("You have changed the user room.");            
          }
        })
      }
    })
  }
}

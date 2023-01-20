import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.css']
})
export class RoomModalComponent implements OnInit {
  ID: number = 0;
  knownAs: string = '';
  roomNumber: number = 0;
  roomType: string = '';
  selectedRoom: number = 0;

  roomList = [1, 2, 3, 4]

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.roomList = this.roomList.filter(x => x !== this.roomNumber);
  }

}

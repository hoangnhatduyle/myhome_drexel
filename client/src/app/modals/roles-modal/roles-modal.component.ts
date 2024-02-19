import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];
  active: any;
  leaseStart: any;
  leaseEnd: any;
  notes: string;

  modifiedLeaseStart: Date;
  modifiedLeaseEnd: Date;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.modifiedLeaseStart = new Date(this.leaseStart.split('-'))
    this.modifiedLeaseEnd = new Date(this.leaseEnd.split('-'))
  }

  updateChecked(checkedValue: string) {
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue);
  }

  changeActive(e: any) {
    var target = e.target;
    if (target.checked) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  // changePayBill(e: any) {
  //   var target = e.target;
  //   if (target.checked) {
  //     this.payBill = true;
  //   } else {
  //     this.payBill = false;
  //   }
  // }

}
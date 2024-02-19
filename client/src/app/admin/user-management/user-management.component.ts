import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { LeaseModalComponent } from 'src/app/modals/lease-modal/lease-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnDestroy, OnInit {
  @Input() users: User[] | undefined;
  dtOptions: DataTables.Settings = {};
  datePipe: DatePipe = new DatePipe('en-US');
  dtTrigger: Subject<any> = new Subject<any>();

  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  bsModalRef2: BsModalRef<LeaseModalComponent> = new BsModalRef<LeaseModalComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ]

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: "",
        searchPlaceholder: 'Search...',
      },
      lengthMenu: [
        [5, 10, 25, -1],
        [5, 10, 25, 'All'],
      ]
    };
    this.dtTrigger.next(void 0);
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.userName,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles],
        active: user.active,
        leaseStart: this.datePipe.transform(user.leaseStart, 'yyyy-MM-dd'),
        leaseEnd: this.datePipe.transform(user.leaseEnd, 'yyyy-MM-dd'),
        notes: user.notes
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        const active = this.bsModalRef.content?.active;
        const leaseStart = this.bsModalRef.content?.modifiedLeaseStart;
        const leaseEnd = this.bsModalRef.content?.modifiedLeaseEnd;
        const notes = this.bsModalRef.content?.notes;

        let leaseStartString = this.datePipe.transform(leaseStart, 'yyyy-MM-dd');
        let leaseEndString = this.datePipe.transform(leaseEnd, 'yyyy-MM-dd');

        if (!this.arrayEqual(selectedRoles!, user.roles) || user.active != active || this.datePipe.transform(user.leaseStart, 'yyyy-MM-dd') != leaseStartString || this.datePipe.transform(user.leaseEnd, 'yyyy-MM-dd') != leaseEndString || user.notes != notes) {
          this.adminService.updateUserDetails(user.userName, selectedRoles!, active, leaseStartString, leaseEndString, notes).subscribe({
            next: roles => {
              user.roles = roles;
              user.active = active;
              user.leaseStart = leaseStart;
              user.leaseEnd = leaseEnd;
              user.notes = notes;
            }
          })
        }
      }
    })
  }

  openLeaseModal(user: User) {
    const config = {
      class: 'modal-dialog-centered modal-xl',
      initialState: {
        username: user.userName
      }
    }
    this.bsModalRef2 = this.modalService.show(LeaseModalComponent, config);
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
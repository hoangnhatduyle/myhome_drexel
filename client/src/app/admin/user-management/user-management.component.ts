import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Bill } from 'src/app/_models/bill';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BillService } from 'src/app/_services/bill.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  users: User[] = [];
  bills: Bill[] = [];
  water: Bill[] = [];
  gas: Bill[] = [];
  electricity: Bill[] = [];
  utility: number = 0;

  date = new Date();
  currMonth = this.date.getMonth();

  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ]

  constructor(private adminService: AdminService, private modalService: BsModalService, private billService: BillService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
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
    this.getUsersWithRoles();
    this.getBill();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {
        let thang = users.find(x => x.userName == 'thang');
        thang!.rentalFee += 60 + 42;

        users[users.indexOf(users.find(x => x.userName == 'thang')!)] = thang!;

        let thao = users.find(x => x.userName == 'thao');
        thao!.rentalFee += 60;

        users[users.indexOf(users.find(x => x.userName == 'thao')!)] = thao!;

        this.users = users
      }
    })
  }

  getBill() {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills.filter(x => x.amount != 0);
          if (this.bills.length > 0) {
            this.water = this.bills.filter(x => x.type == 'water');
            this.gas = this.bills.filter(x => x.type == 'gas');
            this.electricity = this.bills.filter(x => x.type == 'electricity');
            this.utility = parseInt((this.water[this.currMonth].amount / 6 + this.gas[this.currMonth].amount / 6 + this.electricity[this.currMonth].amount / 6).toFixed(2));
          }
        }
        this.dtTrigger.next(void 0);
      }
    })
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.userName,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles]
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, user.roles)) {
          this.adminService.updateUserRoles(user.userName, selectedRoles!).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Bill } from 'src/app/_models/bill';
import { Payment } from 'src/app/_models/payment';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BillService } from 'src/app/_services/bill.service';
import { PaymentService } from 'src/app/_services/payment.service';

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
  payments: Payment[] = [];
  utility: number = 0;
  totalIncome: number = 0;
  totalReceived: number = 0;
  totalPaid: number = 0;
  totalOutcome: number = 0;

  date = new Date();
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currMonth = this.date.getMonth();
  currYear = this.date.getFullYear();

  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ]

  constructor(private adminService: AdminService, private modalService: BsModalService, private billService: BillService, private paymentService: PaymentService) { }

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
    this.paymentService.getPastPayments().subscribe({
      next: payments => {
        this.payments = payments
        this.payments = this.payments.filter(x => x.payMonth == this.currMonth + 1 && this.getYearOfDate(x.payDate) == this.currYear && x.paymentStatus == 'Approve');
        this.payments.forEach(x => {
          this.totalReceived += x.amount;
        })
      }
    })
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {
        this.users = users;
        let thang = users.find(x => x.userName == 'thang');
        thang!.rentalFee += 60 + 42;
        users[users.indexOf(users.find(x => x.userName == 'thang')!)] = thang!;

        this.getBill();
      }
    })
  }

  getBill() {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills.filter(x => x.amount != 0 && x.month == this.currMonth + 1);

          let totalMem = this.users.filter(x => x.userName != 'user' && x.active == true).length - 1; //exclude admin

          this.users = this.users.filter(x => x.userName != 'user');

          if (this.bills.length > 0) {

            this.water = this.bills.filter(x => x.type == 'water');
            this.gas = this.bills.filter(x => x.type == 'gas');
            this.electricity = this.bills.filter(x => x.type == 'electricity');
            this.utility = parseInt((this.water[0].amount / totalMem + this.gas[0].amount / totalMem + this.electricity[0].amount / totalMem).toFixed(2));
          }

          this.bills.forEach(bill => {
            this.totalOutcome += bill.amount;
            if (bill.paid) this.totalPaid += bill.amount;
          });

          let totalMemPayingBill = this.users.filter(x => x.userName != 'user' && x.active == true && x.payBill == true).length - 1; //exclude admin

          this.totalIncome += this.utility * (totalMemPayingBill - 1) //exclude Bao
          this.users.filter(x => x.active == true).forEach(user => {
            this.totalIncome += user.rentalFee;
          });
          this.totalIncome = parseInt((Math.round(this.totalIncome * 100) / 100).toFixed(2))
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
        selectedRoles: [...user.roles],
        active: user.active,
        payBill: user.payBill
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        const active = this.bsModalRef.content?.active;
        const payBill = this.bsModalRef.content?.payBill;
        if (!this.arrayEqual(selectedRoles!, user.roles) || user.active != active || user.payBill != payBill) {
          this.adminService.updateUserRoles(user.userName, selectedRoles!, active, payBill).subscribe({
            next: roles => {
              user.roles = roles;
              user.active = active;
              user.payBill = payBill;

              if (payBill)
              {
                this.totalIncome += this.utility
              }
              else
              {
                this.totalIncome -= this.utility
              }
            }
          })
        }
      }
    })
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

  private getYearOfDate(inputDate: Date) {
    return new Date(inputDate).getFullYear();
  }
}
import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Bill } from 'src/app/_models/bill';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BillService } from 'src/app/_services/bill.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { EditPaymentModalComponent } from 'src/app/modals/edit-payment-modal/edit-payment-modal.component';

@Component({
    selector: 'app-payer-management',
    templateUrl: './payer-management.component.html',
    styleUrls: ['./payer-management.component.css']
})
export class PayerManagementComponent implements OnInit, OnDestroy {
    @Input() users: User[] | undefined;
    bills: Bill[] = [];
    totalOutcome: number = 0;
    totalIncome: number = 0;
    totalPaid: number = 0;
    totalReceived: number = 0;

    dtOptions: DataTables.Settings = {};
    datePipe: DatePipe = new DatePipe('en-US');
    dtTrigger: Subject<any> = new Subject<any>();

    lateDate: number;
    date: Date = new Date();
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    currMonth = this.date.getMonth();

    bsModalRef: BsModalRef<EditPaymentModalComponent> = new BsModalRef<EditPaymentModalComponent>();

    constructor(private adminService: AdminService, private modalService: BsModalService, private billService: BillService, private toastService: ToastrService, private paymentService: PaymentService) { }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    ngOnInit(): void {
        this.lateDate = this.date.getDate() - 15;
        this.getBills();
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
        this.users.filter(x => x.monthlyPayment.payRent == true).forEach(x => {
            this.totalIncome += x.monthlyPayment.totalMonthlyPayment;
            if (x.userName == 'thang') {
                this.totalIncome += 42
                x.monthlyPayment.totalMonthlyPayment += 42;
            }
            if (x.monthlyPayment.paidThisMonth == true) this.totalReceived += x.monthlyPayment.totalMonthlyPayment;
        });
    }

    openEditPaymentModal(user: User) {
        const config = {
            class: 'modal-lg modal-dialog-centered',
            initialState: {
                username: user.userName,
                balance: user.monthlyPayment.totalMonthlyPayment,
                payBill: user.monthlyPayment.payBill,
                payStatus: user.monthlyPayment.paidThisMonth,
                payRent: user.monthlyPayment.payRent
            }
        }
        this.bsModalRef = this.modalService.show(EditPaymentModalComponent, config);
        this.bsModalRef.onHide?.subscribe({
            next: () => {
                const username = this.bsModalRef.content?.username;
                const balance = this.bsModalRef.content?.balance;
                const payBill = this.bsModalRef.content?.payBill;
                const payStatus = this.bsModalRef.content?.payStatus;
                const payRent = this.bsModalRef.content?.payRent;

                if (user.monthlyPayment.payBill != payBill || user.monthlyPayment.paidThisMonth != payStatus || user.monthlyPayment.payRent != payRent) {
                    this.adminService.updateUserMonthlyPayment(user.userName, payBill, payStatus, payRent).subscribe({
                        next: () => {
                            user.monthlyPayment.payBill = payBill;
                            user.monthlyPayment.paidThisMonth = payStatus;
                            user.monthlyPayment.payRent = payRent;

                            this.toastService.success("User Monthly Payment has been updated successfully");
                        }
                    })
                }
            }
        })
    }

    private getBills() {
        this.billService.getBills().subscribe({
            next: bills => {
                if (bills) {
                    this.bills = bills;
                    this.bills = this.bills.filter(x => x.month == this.currMonth + 1)
                    this.bills.forEach(x => {
                        this.totalOutcome += x.amount
                        if (x.paid == true)
                            this.totalPaid += x.amount
                    });
                }
            }
        })
    }
}
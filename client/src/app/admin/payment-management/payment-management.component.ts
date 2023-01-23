import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PaymentModalComponent } from 'src/app/modals/payment-modal/payment-modal.component';
import { Payment } from 'src/app/_models/payment';
import { AdminService } from 'src/app/_services/admin.service';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.css']
})
export class PaymentManagementComponent implements OnInit {
  @ViewChild('paymentSelection') paymentSelection!: ElementRef;
  bsModalRef: BsModalRef<PaymentModalComponent> = new BsModalRef<PaymentModalComponent>();

  selectedMonth: any;
  payments: Payment[] = [];
  jan: Payment[] = [];
  feb: Payment[] = [];
  mar: Payment[] = [];
  apr: Payment[] = [];
  may: Payment[] = [];
  jun: Payment[] = [];
  jul: Payment[] = [];
  aug: Payment[] = [];
  sep: Payment[] = [];
  oct: Payment[] = [];
  nov: Payment[] = [];
  dec: Payment[] = [];

  selectedPayment: Payment[] = [];

  constructor(private paymentService: PaymentService, private modalService: BsModalService, private toastr: ToastrService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPendingPayments();
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe({
      next: payment => {
        if (payment) {
          this.payments = payment;
          this.jan = this.payments.filter(x => x.payMonth == 1);
          this.feb = this.payments.filter(x => x.payMonth == 2);
          this.mar = this.payments.filter(x => x.payMonth == 3);
          this.apr = this.payments.filter(x => x.payMonth == 4);
          this.may = this.payments.filter(x => x.payMonth == 5);
          this.jun = this.payments.filter(x => x.payMonth == 6);
          this.jul = this.payments.filter(x => x.payMonth == 7);
          this.aug = this.payments.filter(x => x.payMonth == 8);
          this.sep = this.payments.filter(x => x.payMonth == 9);
          this.oct = this.payments.filter(x => x.payMonth == 10);
          this.nov = this.payments.filter(x => x.payMonth == 11);
          this.dec = this.payments.filter(x => x.payMonth == 12);
          this.selectedPayment = this.payments;
        }
      }
    })
  }

  getPastPayments() {
    this.paymentService.getPastPayments().subscribe({
      next: payment => {
        if (payment) {
          this.payments = payment;
          this.jan = this.payments.filter(x => x.payMonth == 1);
          this.feb = this.payments.filter(x => x.payMonth == 2);
          this.mar = this.payments.filter(x => x.payMonth == 3);
          this.apr = this.payments.filter(x => x.payMonth == 4);
          this.may = this.payments.filter(x => x.payMonth == 5);
          this.jun = this.payments.filter(x => x.payMonth == 6);
          this.jul = this.payments.filter(x => x.payMonth == 7);
          this.aug = this.payments.filter(x => x.payMonth == 8);
          this.sep = this.payments.filter(x => x.payMonth == 9);
          this.oct = this.payments.filter(x => x.payMonth == 10);
          this.nov = this.payments.filter(x => x.payMonth == 11);
          this.dec = this.payments.filter(x => x.payMonth == 12);
          this.selectedPayment = this.payments;
        }
      }
    })
  }

  onSelected(): void {
    this.selectedMonth = this.paymentSelection.nativeElement.value;
    switch (this.selectedMonth) {
      case "1":
        this.selectedPayment = this.jan;
        break;
      case "2":
        this.selectedPayment = this.feb;
        break;
      case "3":
        this.selectedPayment = this.mar;
        break;
      case "4":
        this.selectedPayment = this.apr;
        break;
      case "5":
        this.selectedPayment = this.may;
        break;
      case "6":
        this.selectedPayment = this.jun;
        break;
      case "7":
        this.selectedPayment = this.jul;
        break;
      case "8":
        this.selectedPayment = this.aug;
        break;
      case "9":
        this.selectedPayment = this.sep;
        break;
      case "10":
        this.selectedPayment = this.oct;
        break;
      case "11":
        this.selectedPayment = this.nov;
        break;
      case "12":
        this.selectedPayment = this.dec;
        break;
      default:
        this.selectedPayment = this.payments;
        break;

    }
  }

  openPaymentModal(payment: Payment) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        id: payment.id,
        method: payment.method,
        month: months[payment.payMonth - 1],
        payDate: payment.payDate,
        amount: payment.amount,
        username: payment.username
      }
    }
    this.bsModalRef = this.modalService.show(PaymentModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const id = this.bsModalRef.content!.id;
        const approve = this.bsModalRef.content!.approve;

        if (approve) {
          this.paymentService.approvePayment(id).subscribe({
            next: _ => {
              this.adminService.updateLastRentalFee(payment.username, payment.amount).subscribe({
                next: _ => {
                  this.toastr.success("You have approved the payment");
                  this.selectedPayment?.splice(this.selectedPayment.findIndex(p => p.id === id), 1);
                }
              })
            }
          })
        }
        else {
          this.paymentService.rejectPayment(id).subscribe({
            next: _ => {
              this.toastr.warning("You have rejected the payment");
              this.selectedPayment?.splice(this.selectedPayment.findIndex(p => p.id === id), 1);
            }
          })
        }
      }
    })
  }
}

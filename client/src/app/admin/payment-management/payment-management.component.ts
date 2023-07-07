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
  bsModalRef: BsModalRef<PaymentModalComponent> = new BsModalRef<PaymentModalComponent>();

  pendingPaymentView = true;
  selectedMonth = "0";
  allPastpayments: Payment[] = [];
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
  listOfYear: number[] = [];
  date = new Date();
  currYear = this.date.getFullYear();
  selectedYear = this.currYear;

  constructor(private paymentService: PaymentService, private modalService: BsModalService, private toastr: ToastrService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPendingPayments();
    for (let i = 2024; i <= this.currYear; i++) {
      this.listOfYear.push(i);
    }
  }

  sendEmail(approve: boolean, payment: Payment) {
    // SecureToken: "399a8e06-2d9f-4766-a406-181ce4e20946",
    var Email = require('./../../../assets/smtp.js');
    var bodyHtml = "<div style='width: 40%; display: flex; justify-content: center; margin: auto; color: black;'> <div> <div style='display: flex; padding-top: 20px;'><img style='max-height: 30px; margin-right: auto;' src='https://drive.google.com/uc?export=view&id=1xzzz5GlCCovVVRZ4cTxxgRTR2Bea5P4S'><span style='font-size: 18px; font-weight: bold;'>Payment Notification</span></div> <hr> <div>You have 1 new notification:</div>";

    if (approve)
    {
      bodyHtml += `<div style='margin-top: 20px; margin-bottom: 20px; padding: 5px 5px; border: 0.5px solid gray;'><b>Your payment of $${payment.amount} on ${payment.payDate} was <span style="color: green;">approved</span>.</b></div><div>Thank you for your payment. Please login to view more information.</div><br>`;
    }
    else
    {
      bodyHtml += `<div style='margin-top: 20px; margin-bottom: 20px; padding: 5px 5px; border: 0.5px solid gray;'><b>Your payment of $${payment.amount} on ${payment.payDate} was <span style="color: red;">rejected</span>.</b></div><div>Sorry for any inconvenience. Please contact us for more information.</div><br>`;
    }

    bodyHtml += "<div>Best wishes,<div><br> <div><b>myHome Payment Notification</b> <div> <div style='font-style: italic;'>Customer Service</div><br> <div>3201 Avondale Avenue | Toledo, OH | 43607</div> <div>Phone Number: 419-699-9535</div> <div>Email: lehoangnhatduy2000@gmail.com</div><br> </div> </div> </div> </div> </div> </div>";

    Email.send({
      SecureToken: "45347233-f706-4605-a56a-e522e578b0c5",
      To: payment.email,
      From: "myhomecsupp@gmail.com",
      Subject: "Payment Notification",
      Body: bodyHtml
    }).then(
      () => {
        if (approve)
        {
          this.toastr.success("You have approved the payment");
          this.selectedPayment?.splice(this.selectedPayment.findIndex(p => p.id === payment.id), 1);
        }
        else
        {
          this.toastr.warning("You have rejected the payment");
          this.selectedPayment?.splice(this.selectedPayment.findIndex(p => p.id === payment.id), 1);
        }
      }
    );
  }

  getPendingPayments() {
    this.pendingPaymentView = true;
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
    this.pendingPaymentView = false;
    this.paymentService.getPastPayments().subscribe({
      next: payment => {
        if (payment) {
          this.allPastpayments = payment;
          this.payments = this.allPastpayments.filter(x => this.getYearOfDate(x.payDate) == this.selectedYear);
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

  onYearSelected() {
    let year = this.selectedYear;

    this.payments = this.allPastpayments.filter(x => this.getYearOfDate(x.payDate) == year);
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
    this.onSelected();
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
        let model: any = {};
        model.id = id;
        model.amount = payment.amount;
        model.username = payment.username;

        if (approve) {
          this.paymentService.approvePayment(model).subscribe({
            next: _ => {
              this.sendEmail(true, payment);
            }
          })
        }
        else {
          this.paymentService.rejectPayment(id).subscribe({
            next: _ => {
              this.sendEmail(false, payment);
            }
          })
        }
      }
    })
  }

  getYearOfDate(inputDate: Date) {
    return new Date(inputDate).getFullYear();
  }
}

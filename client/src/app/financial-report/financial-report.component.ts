import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FinancialModalComponent } from '../financial-modal/financial-modal.component';
import { FinancialReport } from '../_models/financialReport';
import { AdminService } from '../_services/admin.service';
import { BillService } from '../_services/bill.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Payment } from '../_models/payment';
import { PaymentService } from '../_services/payment.service';
import { NewFinancialReportModalComponent } from '../new-financial-report-modal/new-financial-report-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {
  @ViewChild('yearSelection') yearSelection!: ElementRef;
  bsModalRef: BsModalRef<FinancialModalComponent> = new BsModalRef<FinancialModalComponent>();
  bsModalRef2: BsModalRef<NewFinancialReportModalComponent> = new BsModalRef<NewFinancialReportModalComponent>();

  financeReport: FinancialReport[] = [];
  payments: Payment[] = [];

  listOfYear: number[] = [];

  date = new Date();
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currYear = this.date.getFullYear();
  currMonth = this.date.getMonth();

  constructor(private adminService: AdminService, private modalService: BsModalService, private paymentService: PaymentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // var selectedYear = this.yearSelection.nativeElement.value;
    this.adminService.getFinancialReport(this.currYear).subscribe({
      next: report => {
        this.financeReport = report;
      }
    })
    for (let i = 2024; i <= this.currYear; i++) {
      this.listOfYear.push(i);
    }
    this.loadPayments();
  }

  openReportModal(report: FinancialReport) {
    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        id: report.id,
        report: report,
        payments: this.payments.filter(x => x.payMonth == report.month && new Date(x.payDate).getFullYear() == report.year)
      }
    }
    this.bsModalRef = this.modalService.show(FinancialModalComponent, config);
  }

  loadPayments() {
    this.paymentService.getPastPayments().subscribe({
      next: payments => {
        if (payments) {
          this.payments = payments;
        }
      }
    })
  }

  addNewData() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {}
    }
    this.bsModalRef2 = this.modalService.show(NewFinancialReportModalComponent, config);
    this.bsModalRef2.onHide?.subscribe({
      next: () => {
        const values = this.bsModalRef2.content!.values;
        if (Object.keys(values).length === 0) return;
        this.adminService.addFinancialReport(values).subscribe({
          next: () => {
            const newReport: FinancialReport = {
              month: values.month,
              year: values.year,
              totalIncome: values.totalIncome,
              totalOutcome: values.totalOutcome,
              netIncome: values.netIncome,
              waterBill: values.waterBill,
              electricityBill: values.electricityBill,
              gasBill: values.gasBill,
              mobileBill: values.mobileBill,
              internetBill: values.internetBill,
              insuranceBill: values.insuranceBill,
              owedWaterBill: values.owedWaterBill,
            };

            this.financeReport.push(newReport);
            this.toastr.success("Report has been added successfully");
          },
          error: error => {
            this.toastr.error(error);
          }
        })
      }
    })
  }

  onSelected(): void {
    let year = this.yearSelection.nativeElement.value;

    this.adminService.getFinancialReport(year).subscribe({
      next: report => {
        this.financeReport = report;
      }
    })
  }

  printPDF() {
    const div = document.getElementById("html2Pdf");
    const options = { background: "gray", height: div!.clientHeight, width: div!.clientWidth };

    html2canvas(div!, options).then((canvas) => {
      let fileWidth = 287;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      //Initialize JSPDF
      let doc = new jsPDF("l");
      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 5, 5, fileWidth, fileHeight);

      let pdfOutput = doc.output();

      //Name of pdf
      const fileName = "FinancialReport_" + this.currYear + ".pdf";

      // Make file
      doc.save(fileName);

    });
  }
}

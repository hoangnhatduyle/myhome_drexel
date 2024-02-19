import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillsModalComponent } from 'src/app/modals/bills-modal/bills-modal.component';
import { Bill } from 'src/app/_models/bill';
import { BillService } from 'src/app/_services/bill.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.css']
})
export class BillManagementComponent implements OnInit {
  @ViewChild('billSelection') billSelection!: ElementRef;
  @Input() bills: Bill[] | undefined;
  bsModalRef: BsModalRef<BillsModalComponent> = new BsModalRef<BillsModalComponent>();
  datePipe: DatePipe = new DatePipe('en-US');
  selectedUrl = 'https://toledo.oh.gov/departments/public-utilities';

  water: Bill[] = [];
  gas: Bill[] = [];
  electricity: Bill[] = [];
  insurance: Bill[] = [];
  internet: Bill[] = [];
  mobile: Bill[] = [];
  owed_water: Bill[] = [];

  selectedBills: Bill[] = [];
  selectedBill = '';

  config = {
    height: 25,
    width: 55,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: '#48b557',
      unchecked: '#dd6464',
    },
    switchColor: {
      checked: '#F0F1EC',
      unchecked: 'F0F1EC',
    },
    labels: {
      unchecked: 'No',
      checked: 'Yes',
    },
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
  };

  constructor(private billService: BillService, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.bills && this.bills.length > 0) {
      this.water = this.bills.filter(x => x.type == 'water').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.gas = this.bills.filter(x => x.type == 'gas').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.electricity = this.bills.filter(x => x.type == 'electricity').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.insurance = this.bills.filter(x => x.type == 'insurance').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.internet = this.bills.filter(x => x.type == 'internet').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.mobile = this.bills.filter(x => x.type == 'mobile').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.owed_water = this.bills.filter(x => x.type == 'owed_water').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);

      this.selectedBills = this.water;
    }
  }

  goToBill() {
    window.open(
      this.selectedUrl,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  resetPaid() {
    this.billService.updatePaidThisMonth().subscribe({
      next: () => {
        this.toastr.success("Paid This Month has been reset successfully");
      }
    })
  }

  onSelected(): void {
    this.selectedBill = this.billSelection.nativeElement.value;
    if (this.selectedBill == "water") {
      this.selectedBills = this.water;
      this.selectedUrl = 'https://toledo.oh.gov/departments/public-utilities';
    }
    else if (this.selectedBill == "gas") {
      this.selectedBills = this.gas;
      this.selectedUrl = 'https://www.columbiagasohio.com/';
    }
    else if (this.selectedBill == "electricity") {
      this.selectedBills = this.electricity;
      this.selectedUrl = 'https://www.firstenergycorp.com/toledo_edison.html';
    }
    else if (this.selectedBill == "insurance") {
      this.selectedBills = this.insurance;
      this.selectedUrl = '';
    }
    else if (this.selectedBill == "internet") {
      this.selectedBills = this.internet;
      this.selectedUrl = 'https://www.t-mobile.com/';
    }
    else if (this.selectedBill == "mobile") {
      this.selectedBills = this.mobile;
      this.selectedUrl = 'https://www.t-mobile.com/';
    }
    else if (this.selectedBill == "owed_water") {
      this.selectedBills = this.owed_water;
      this.selectedUrl = 'https://toledo.oh.gov/departments/public-utilities';
    }
  }

  openBillModal(bill: Bill) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        ID: bill.id,
        type: bill.type,
        month: months[bill.month - 1],
        amount: bill.amount,
        dueDate: bill.dueDate,
        paidDate: bill.paidDate
      }
    }
    this.bsModalRef = this.modalService.show(BillsModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const id = this.bsModalRef.content!.ID;
        const amount = this.bsModalRef.content!.amount;
        const origDueDate = this.bsModalRef.content!.dueDate!;
        const origPaidDate = this.bsModalRef.content!.paidDate!;
        const dueDate = this.datePipe.transform(origDueDate, 'yyyy-MM-dd');
        const paidDate = this.datePipe.transform(origPaidDate, 'yyyy-MM-dd');

        if (bill.amount != amount || this.datePipe.transform(bill.dueDate, 'yyyy-MM-dd') != dueDate || this.datePipe.transform(bill.paidDate, 'yyyy-MM-dd') != paidDate) {
          this.billService.updateBillAmount(id, amount, dueDate!, paidDate!, bill.type).subscribe({
            next: () => {
              bill.amount = amount;
              bill.dueDate = origDueDate!;
              bill.paidDate = origPaidDate!;
              const index = this.selectedBills.indexOf(bill)
              this.selectedBills[index] = { ...this.selectedBills[index], ...bill }
              this.toastr.success("Bill has been updated successfully");
            }
          })
        }
      }
    })
  }

  changePaidStatus(bill: Bill) {
    this.billService.updateBillStatus(bill.id, bill.paid).subscribe({
      next: () => {
        this.toastr.success("Bill has been updated successfully");
        bill.paidDate = new Date();
      }
    })
  }
}

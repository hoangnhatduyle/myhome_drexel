import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillsModalComponent } from '../bills-modal/bills-modal.component';
import { RolesModalComponent } from '../modals/roles-modal/roles-modal.component';
import { Bill } from '../_models/bill';
import { BillService } from '../_services/bill.service';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.css']
})
export class BillManagementComponent implements OnInit {
  @ViewChild('billSelection') billSelection!: ElementRef;
  bsModalRef: BsModalRef<BillsModalComponent> = new BsModalRef<BillsModalComponent>();

  bills: Bill[] = [];
  water: Bill[] = [];
  gas: Bill[] = [];
  electricity: Bill[] = [];
  selectedBills: Bill[] = [];

  selectedBill = '';

  constructor(private billService: BillService, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills;
          this.water = this.bills.filter(x => x.type == 'water');
          this.gas = this.bills.filter(x => x.type == 'gas');
          this.electricity = this.bills.filter(x => x.type == 'electricity');
          this.selectedBills = this.bills;
        }
      }
    })
  }

  onSelected(): void {
    this.selectedBill = this.billSelection.nativeElement.value;
    if (this.selectedBill == "water") {
      this.selectedBills = this.water;
    }
    else if (this.selectedBill == "gas") {
      this.selectedBills = this.gas;
    }
    else if (this.selectedBill == "electricity") {
      this.selectedBills = this.electricity;
    }
    else {
      this.selectedBills = this.bills;
    }
  }

  openRolesModal(bill: Bill) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        ID: bill.id,
        type: bill.type,
        month: months[bill.month - 1],
        amount: bill.amount
      }
    }
    this.bsModalRef = this.modalService.show(BillsModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const id = this.bsModalRef.content!.ID;
        const amount = this.bsModalRef.content!.amount;
        this.billService.updateBill(id, amount).subscribe({
          next: () => {
            this.billService.getBills().subscribe({
              next: bills => {
                if (bills) {
                  this.bills = bills;
                  this.water = this.bills.filter(x => x.type == 'water');
                  this.gas = this.bills.filter(x => x.type == 'gas');
                  this.electricity = this.bills.filter(x => x.type == 'electricity');
                  this.onSelected();
                  this.toastr.success("Bill has been updated successfully")
                }
              }
            })
          }
        })

      }
    })
  }
}

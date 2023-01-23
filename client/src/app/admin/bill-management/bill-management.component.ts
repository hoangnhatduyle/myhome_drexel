import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillsModalComponent } from 'src/app/modals/bills-modal/bills-modal.component';
import { Bill } from 'src/app/_models/bill';
import { Member } from 'src/app/_models/member';
import { BillService } from 'src/app/_services/bill.service';
import { MembersService } from 'src/app/_services/members.service';

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
  members: Member[] = [];
  usernames: string[] = [];

  selectedBill = '';

  constructor(private memberService: MembersService, private billService: BillService, private modalService: BsModalService, private toastr: ToastrService) { }

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
    this.loadMembers();
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

  loadMembers() {
    this.memberService.getMembersWithoutUserParam().subscribe({
      next: members => {
        if (members) {
          this.members = members;
          this.usernames = this.members.map(x => x.userName)
        }
      }
    })
  }

  openBillModal(bill: Bill) {
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
        this.billService.updateBill(id, amount, this.usernames).subscribe({
          next: () => {
            bill.amount = amount;
            const index = this.selectedBills.indexOf(bill)
            this.selectedBills[index] = { ...this.selectedBills[index], ...bill }
            this.toastr.success("Bill has been updated successfully");
          }
        })

      }
    })
  }
}

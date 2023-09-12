import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillService } from '../_services/bill.service';
import { Bill } from '../_models/bill';
import { MembersService } from '../_services/members.service';
import { Member } from '../_models/member';

@Component({
  selector: 'app-new-financial-report-modal',
  templateUrl: './new-financial-report-modal.component.html',
  styleUrls: ['./new-financial-report-modal.component.css']
})
export class NewFinancialReportModalComponent implements OnInit {
  newReportForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  values: any = {};
  bills: Bill[] = [];
  members: Member[] = [];

  water: Bill = null;
  gas: Bill = null;
  electricity: Bill = null;
  internet: Bill = null;
  mobile: Bill = null;
  insurance: Bill = null;
  owed_water: Bill = null;

  totalIncome: number = 0;
  totalOutcome: number = 0;
  utility: number = 0;

  date = new Date();
  currMonth = this.date.getMonth();

  constructor(public bsModalRef2: BsModalRef, private fb: FormBuilder, private toastr: ToastrService, private billService: BillService, private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  saveValues() {
    this.values = { ...this.newReportForm.value };
  }

  initializeForm() {
    this.newReportForm = this.fb.group({
      year: [this.date.getFullYear(), Validators.required],
      month: [this.date.getMonth() + 1, Validators.required],
      totalIncome: [this.totalIncome, Validators.required],
      totalOutcome: [this.totalOutcome, Validators.required],
      netIncome: [this.totalIncome - this.totalOutcome, Validators.required],
      waterBill: [(this.water == undefined || this.water == null) ? 0 : this.water.amount, Validators.required],
      electricityBill: [(this.electricity == undefined || this.electricity == null) ? 0 : this.electricity.amount, Validators.required],
      gasBill: [(this.gas == undefined || this.gas == null) ? 0 : this.gas.amount, Validators.required],
      mobileBill: [(this.mobile == undefined || this.mobile == null) ? 0 : this.mobile.amount, Validators.required],
      internetBill: [(this.internet == undefined || this.internet == null) ? 0 : this.internet.amount, Validators.required],
      insuranceBill: [(this.insurance == undefined || this.insurance == null) ? 0 : this.insurance.amount, Validators.required],
      owedWaterBill: [(this.owed_water == undefined || this.owed_water == null) ? 0 : this.owed_water.amount, Validators.required],
    })
  }

  getBill() {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills.filter(x => x.amount != 0 && x.month == this.currMonth + 1);

          let totalMem = this.members.filter(x => x.userName != 'user' && x.active == true && x.payBill == true).length;

          if (this.bills.length > 0) {

            this.water = this.bills.filter(x => x.type == 'water' && x.month == this.currMonth + 1)[0];
            this.gas = this.bills.filter(x => x.type == 'gas' && x.month == this.currMonth + 1)[0];
            this.electricity = this.bills.filter(x => x.type == 'electricity' && x.month == this.currMonth + 1)[0];
            this.internet = this.bills.filter(x => x.type == 'internet' && x.month == this.currMonth + 1)[0];
            this.mobile = this.bills.filter(x => x.type == 'mobile' && x.month == this.currMonth + 1)[0];
            this.insurance = this.bills.filter(x => x.type == 'insurance' && x.month == this.currMonth + 1)[0];
            this.owed_water = this.bills.filter(x => x.type == 'owed_water' && x.month == this.currMonth + 1)[0];


            this.utility = parseInt((this.water.amount / totalMem + this.gas.amount / totalMem + this.electricity.amount / totalMem).toFixed(2));

            this.totalOutcome += (this.water == undefined || this.water == null) ? 0 : this.water.amount
            this.totalOutcome += (this.gas == undefined || this.gas == null) ? 0 : this.gas.amount
            this.totalOutcome += (this.electricity == undefined || this.electricity == null) ? 0 : this.electricity.amount
            this.totalOutcome += (this.internet == undefined || this.internet == null) ? 0 : this.internet.amount
            this.totalOutcome += (this.mobile == undefined || this.mobile == null) ? 0 : this.mobile.amount
            this.totalOutcome += (this.insurance == undefined || this.insurance == null) ? 0 : this.insurance.amount
            this.totalOutcome += (this.owed_water == undefined || this.owed_water == null) ? 0 : this.owed_water.amount
          }

          this.totalIncome += this.utility * (totalMem - 1); //exlude Bao
          this.members.filter(x => x.active == true).forEach(user => {
            this.totalIncome += user.rentalFee;
            if (user.userName == 'thang')
              this.totalIncome += 60 + 42;
          });
          this.totalIncome = parseInt((Math.round(this.totalIncome * 100) / 100).toFixed(2))
        }
        this.initializeForm();
      }
    })
  }

  loadMembers() {
    this.memberService.getMembersWithoutUserParam().subscribe({
      next: members => {
        if (members) {
          this.members = members.filter(x => x.active);
          this.getBill();
        }
      }
    })
  }
}

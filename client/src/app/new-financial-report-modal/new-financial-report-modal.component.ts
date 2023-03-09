import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-financial-report-modal',
  templateUrl: './new-financial-report-modal.component.html',
  styleUrls: ['./new-financial-report-modal.component.css']
})
export class NewFinancialReportModalComponent implements OnInit {
  newReportForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  values: any = {};

  constructor(public bsModalRef2: BsModalRef, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  saveValues() {
    this.values = { ...this.newReportForm.value };
  }

  initializeForm() {
    this.newReportForm = this.fb.group({
      year: ['', Validators.required],
      month: [0, Validators.required],
      totalIncome: ['', Validators.required],
      totalOutcome: ['', Validators.required],
      netIncome: ['', Validators.required],
      waterBill: ['', Validators.required],
      electricityBill: ['', Validators.required],
      gasBill: ['', Validators.required],
      mobileBill: ['', Validators.required],
      internetBill: ['', Validators.required],
      insuranceBill: ['', Validators.required],
      owedWaterBill: ['', Validators.required],
    })
  }
}

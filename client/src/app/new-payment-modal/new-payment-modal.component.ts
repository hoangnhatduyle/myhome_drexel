import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-new-payment-modal',
  templateUrl: './new-payment-modal.component.html',
  styleUrls: ['./new-payment-modal.component.css']
})
export class NewPaymentModalComponent implements OnInit {
  newPaymentForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  values = {};

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newPaymentForm = this.fb.group({
      method: ['Zelle'],
      amount: ['', Validators.required],
      payDate: ['', Validators.required],
      payMonth: ['0', Validators.required]
    })
  }

  saveValues() {
    const dob = this.getDateOnly(this.newPaymentForm.controls['payDate'].value);
    this.values = { ...this.newPaymentForm.value, payDate: dob };
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}

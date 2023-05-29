import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../../_services/members.service';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-new-payment-modal',
  templateUrl: './new-payment-modal.component.html',
  styleUrls: ['./new-payment-modal.component.css']
})
export class NewPaymentModalComponent implements OnInit {
  newPaymentForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  values: any = {};
  model: any = {};
  member: Member | undefined;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMember();
  }

  initializeForm() {
    this.newPaymentForm = this.fb.group({
      method: ['Zelle'],
      amount: ['', Validators.required],
      payDate: ['', Validators.required]
    })
  }

  loadMember() {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const user: User = JSON.parse(userString);

    this.memberService.getMember(user.userName).subscribe({
      next: returnUser => {
        this.member = returnUser;
      }
    })
  }

  saveValues() {
    const dob = this.getDateOnly(this.newPaymentForm.controls['payDate'].value);
    this.values = { ...this.newPaymentForm.value, payDate: dob, payMonth: this.newPaymentForm.controls['payDate'].value.getMonth() + 1 };
  }

  sendEmail(e: Event) {
    e.preventDefault();
    this.model.name = this.member!.knownAs;
    this.model.content = this.member!.knownAs + ' has submitted a payment of $' + this.values.amount + " on " + this.values.payDate;

    this.model.phone = this.member!.phoneNumber;
    this.model.email = this.member!.email;
    emailjs.send('service_posa4p3', 'template_ybp41ea', this.model, 'YX7ijBeJSEuuOp_FO')
      .then((result: EmailJSResponseStatus) => {
        
      }, (error) => {
      });
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}

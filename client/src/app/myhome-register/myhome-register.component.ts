import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-myhome-register',
  templateUrl: './myhome-register.component.html',
  styleUrls: ['./myhome-register.component.css']
})
export class MyhomeRegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  isChecked = false;
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;
  modalRef?: BsModalRef;

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private modalService: BsModalService, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: _ => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity()
      }
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = { ...this.registerForm.value, dateOfBirth: dob };

    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-myhome-reset-password',
  templateUrl: './myhome-reset-password.component.html',
  styleUrls: ['./myhome-reset-password.component.css']
})
export class MyhomeResetPasswordComponent implements OnInit {
  @ViewChild('newPassword') newPassword: ElementRef | undefined;
  @ViewChild('confirmNewPassword') confirmNewPassword: ElementRef | undefined;
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.model.email = navigation?.extras?.state?.['email'];
  }

  ngOnInit(): void {
  }

  resetPassword() {
    var newPass = this.newPassword?.nativeElement.value;
    var confirmNewPass = this.confirmNewPassword?.nativeElement.value;

    if (newPass !== confirmNewPass) {
      this.model = {};
      this.toastr.error("Confirm Password does not match. Please try again.");
    }
    else {
      this.accountService.resetPassword(this.model).subscribe({
        next: _ => {
          this.toastr.success("Password has been changed");
          this.router.navigateByUrl('/');
        }
      })
    }
  }
}

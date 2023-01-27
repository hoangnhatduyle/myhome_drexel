import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-myhome-forgot-password',
  templateUrl: './myhome-forgot-password.component.html',
  styleUrls: ['./myhome-forgot-password.component.css']
})
export class MyhomeForgotPasswordComponent implements OnInit {
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.accountService.forgotPassword(this.model.email).subscribe({
      next: obj => {
        this.toastr.success(obj.message);
        const navigtaionExtras: NavigationExtras = { state: { email: this.model.email } }
        this.router.navigateByUrl('/reset-password', navigtaionExtras);
      }
    })
  }
}

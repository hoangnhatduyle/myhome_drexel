import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-myhome-changepassword',
  templateUrl: './myhome-changepassword.component.html',
  styleUrls: ['./myhome-changepassword.component.css']
})
export class MyhomeChangepasswordComponent implements OnInit {
  @ViewChild('newPassword') newPassword: ElementRef | undefined;
  @ViewChild('confirmNewPassword') confirmNewPassword: ElementRef | undefined;
  @Input() user: User | null | undefined;
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  changePassword() {
    var newPass = this.newPassword?.nativeElement.value;
    var confirmNewPass = this.confirmNewPassword?.nativeElement.value;

    if (newPass !== confirmNewPass) {
      this.model = {};
      this.toastr.error("Confirm Password does not match. Please try again.");
    }
    else {
      this.model.Username = this.user?.userName;
      this.accountService.changePassword(this.model).subscribe({
        next: () => {
          this.model = {};
          this.toastr.success("Password changed successfully.");
        },
        error: error => {
          this.toastr.error(error);          
        }
      });
    }
  }
}

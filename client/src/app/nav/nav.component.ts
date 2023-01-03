import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild("loginForm") loginForm: NgForm | undefined;
  model: any = {};

  constructor(public accountService: AccountService, private memberService: MembersService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl("/members")
        this.memberService.resetUserParams();
        this.loginForm?.reset();
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}

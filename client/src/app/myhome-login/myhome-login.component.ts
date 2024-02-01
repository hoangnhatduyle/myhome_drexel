import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-myhome-login',
  templateUrl: './myhome-login.component.html',
  styleUrls: ['./myhome-login.component.css']
})
export class MyhomeLoginComponent implements OnInit {
  model: any = {};
  registerMode = false;

  constructor(public accountService: AccountService, private router: Router, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("myHOME - Login/Register");
    // this.router.navigateByUrl("/main/dashboard");
    if ("user" in localStorage) {
      var token = JSON.parse(localStorage.getItem('user')).token;
      if (token != null && token != undefined && !this.tokenExpired(token)) {
        this.router.navigateByUrl("/main/dashboard");
      }
    }
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl("/main/dashboard")
    });
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}

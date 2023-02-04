import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-myhome-nav',
  templateUrl: './myhome-nav.component.html',
  styleUrls: ['./myhome-nav.component.css']
})
export class MyhomeNavComponent implements OnInit {
  opened: boolean = true;
  search: boolean = false;
  autoCollapseWidth: number = 750;
  modalRef?: BsModalRef;
  screenWidth: number = 0;

  user: User | null = null;

  constructor(public accountService: AccountService, private router: Router, private titleService: Title,
    private modalService: BsModalService, private cdref: ChangeDetectorRef, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
    this.titleService.setTitle("myHOME");
  }

  closeNavBar() {
    if (this.opened == true) {
      this.toggleOpened(false);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {

  }

  toggleOpened(noti = true): void {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 750) this.opened = !this.opened;
    else {
      if (noti) {
        this.toastr.error("Cannot collapse the sidebar")
      }
    }
  }

  toggleSearch(): void {
    this.search = !this.search;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}

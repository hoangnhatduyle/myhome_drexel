import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-myhome-nav',
  templateUrl: './myhome-nav.component.html',
  styleUrls: ['./myhome-nav.component.css']
})
export class MyhomeNavComponent implements OnInit {
  opened: boolean = true;
  search: boolean = false;
  autoCollapseWidth: number = 800;
  modalRef?: BsModalRef;

  user: User | null = null;

  constructor(public accountService: AccountService, private router: Router, private titleService: Title, 
    private modalService: BsModalService, private cdref: ChangeDetectorRef) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
    this.titleService.setTitle("myHOME");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    
  }

  toggleOpened(): void {
    this.opened = !this.opened;
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

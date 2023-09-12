import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active-lender',
  templateUrl: './active-lender.component.html',
  styleUrls: ['./active-lender.component.css']
})
export class ActiveLenderComponent implements OnInit {
  users: User[] = [];
  isVisible: boolean = true;

  constructor(private adminService: AdminService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {
        this.users = users;
        this.users = this.users.filter(x => x.userName != 'admin' && x.userName != 'user');
      }
    })
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
    this.getUsersWithRoles();
    this.toastr.success("Refresh successfully!");
  }
}

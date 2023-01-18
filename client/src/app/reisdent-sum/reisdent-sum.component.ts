import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-reisdent-sum',
  templateUrl: './reisdent-sum.component.html',
  styleUrls: ['./reisdent-sum.component.css']
})
export class ReisdentSumComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  isVisible: boolean = true;

  constructor(private memberService: MembersService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembersWithoutUserParam().subscribe({
      next: members => {
        if (members) {
          this.members = members;
        }
      }
    })
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
    this.loadMembers();
    this.toastr.success("Refresh successfully!");
  }
}

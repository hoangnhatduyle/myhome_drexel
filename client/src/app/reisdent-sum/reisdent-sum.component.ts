import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-reisdent-sum',
  templateUrl: './reisdent-sum.component.html',
  styleUrls: ['./reisdent-sum.component.css']
})
export class ReisdentSumComponent implements OnInit {
  members: Member[] = [];
  isVisible: boolean = true;

  constructor(private memberService: MembersService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(refetch = false) {
    this.memberService.getMembersWithoutUserParam(refetch).subscribe({
      next: members => {
        if (members) {
          this.members = members.filter(x => x.active);
        }
      }
    })
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
    this.loadMembers(true);
    this.toastr.success("Refresh successfully!");
  }
}

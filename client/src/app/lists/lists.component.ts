import { Component, OnInit } from '@angular/core';
import { LikeParams } from '../_models/likeParam';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined;
  likeParams: LikeParams = new LikeParams();
  pagination: Pagination | undefined;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.likeParams).subscribe({
      next: response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any) {
    if (this.likeParams?.pageNumber && this.likeParams?.pageNumber !== event.page) {
      this.likeParams.pageNumber = event.page;
      this.loadLikes();
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-myhome-member-overview',
  templateUrl: './myhome-member-overview.component.html',
  styleUrls: ['./myhome-member-overview.component.css']
})
export class MyhomeMemberOverviewComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

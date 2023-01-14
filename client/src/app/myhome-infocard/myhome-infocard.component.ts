import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-myhome-infocard',
  templateUrl: './myhome-infocard.component.html',
  styleUrls: ['./myhome-infocard.component.css']
})
export class MyhomeInfocardComponent implements OnInit {
  @Input() member: Member | undefined;
  dueDate: string | undefined;

  constructor() { }

  ngOnInit(): void {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const currentDate = document.querySelector("#due_date");

    let date = new Date();
    let currMonth = date.getMonth();

    let dueDate = month[currMonth] + " - 15";

    this.dueDate = dueDate;
  }

}

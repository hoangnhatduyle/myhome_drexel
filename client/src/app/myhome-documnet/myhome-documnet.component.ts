import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-myhome-documnet',
  templateUrl: './myhome-documnet.component.html',
  styleUrls: ['./myhome-documnet.component.css']
})
export class MyhomeDocumnetComponent implements OnInit {
  @ViewChild('yearSelection') yearSelection!: ElementRef;
  username: string;
  listOfYear: number[] = [];
  documentUrl: string;

  date = new Date();
  currYear = this.date.getFullYear();

  selectedYear = 2022;

  constructor() { }

  ngOnInit(): void {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const user = JSON.parse(userString);

    this.username = user.userName;

    this.documentUrl = "../../assets/documents/" + this.username + "/" + this.selectedYear + ".pdf";

    for (let i = 2024; i <= this.currYear; i++) {
      this.listOfYear.push(i);
    }
  }

  onSelected(): void {
    this.selectedYear = this.yearSelection.nativeElement.value;
    this.documentUrl = "../../assets/documents/" + this.username + "/" + this.selectedYear + ".pdf";
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lease-modal',
  templateUrl: './lease-modal.component.html',
  styleUrls: ['./lease-modal.component.css']
})
export class LeaseModalComponent implements OnInit {
  @ViewChild('yearSelection') yearSelection!: ElementRef;
  username = '';
  listOfYear: number[] = [];
  documentUrl: string;

  date = new Date();
  currYear = this.date.getFullYear();

  selectedYear = 2022;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
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

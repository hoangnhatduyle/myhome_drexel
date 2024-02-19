import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';

@Component({
  selector: 'app-myhome-infocard',
  templateUrl: './myhome-infocard.component.html',
  styleUrls: ['./myhome-infocard.component.css']
})
export class MyhomeInfocardComponent implements OnInit {
  @Output() reloadMember = new EventEmitter();
  @Input() member: Member | undefined;

  dueDate: string | undefined;
  isVisible: boolean = true;
  percentChange: string = '';
  higher: boolean = false;
  total = 0;
  date = new Date();
  currMonth = this.date.getMonth();
  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnChanges() {
    if (this.member) {
      this.total = this.member.monthlyPayment.totalMonthlyPayment;

      if (this.member!.userName == "thang") {
        this.total += 42;
      }

      this.total = parseFloat(this.total.toFixed(3));

      this.percentChange = Math.abs((this.total - this.member!.monthlyPayment.lastRentalFee) / this.member!.monthlyPayment.lastRentalFee * 100).toFixed(3);

      if (this.total > this.member!.monthlyPayment.lastRentalFee) this.higher = true;
      else this.higher = false;
    }
  }

  ngOnInit(): void {
    // const currentDate = document.querySelector("#due_date");
    let dueDate = this.month[this.currMonth] + " - 15";
    this.dueDate = dueDate;
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.reloadMember.emit(false);
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

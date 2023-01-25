import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from '../_models/bill';
import { Member } from '../_models/member';

@Component({
  selector: 'app-myhome-infocard',
  templateUrl: './myhome-infocard.component.html',
  styleUrls: ['./myhome-infocard.component.css']
})
export class MyhomeInfocardComponent implements OnInit {
  @Output() reloadMember = new EventEmitter();
  @Input() member: Member | undefined;
  @Input() bills: Bill[] | undefined;

  dueDate: string | undefined;
  isVisible: boolean = true;
  water: number = 0;
  gas: number = 0;
  electricity: number = 0;
  percentChange: string = '';
  higher: boolean = false;
  total = 0;
  date = new Date();
  currMonth = this.date.getMonth();
  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnChanges() {
    if (this.member && this.bills && this.bills.length > 0) {
      this.water = this.bills!.filter(x => x.type == 'water' && x.month == this.currMonth + 1)[0].amount;
      this.gas = this.bills!.filter(x => x.type == 'gas' && x.month == this.currMonth + 1)[0].amount;
      this.electricity = this.bills!.filter(x => x.type == 'electricity' && x.month == this.currMonth + 1)[0].amount;

      this.total = 0;

      this.total = Math.round(this.water / 6 + this.gas / 6 + this.electricity / 6 + this.member.rentalFee);
      this.percentChange = Math.abs((this.total - this.member.lastRentalFee) / this.member.lastRentalFee * 100).toFixed(2);

      if (this.total > this.member.lastRentalFee) this.higher = true;
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

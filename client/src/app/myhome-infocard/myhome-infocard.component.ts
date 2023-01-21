import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from '../_models/bill';
import { Member } from '../_models/member';
import { BillService } from '../_services/bill.service';

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
  bills: Bill[] = [];
  water: number = 0;
  gas: number = 0;
  electricity: number = 0;
  percentChange: string = '';
  higher: boolean = false;
  total = 0;
  date = new Date();
  currMonth = this.date.getMonth();

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService, private billService: BillService) { }

  ngOnInit(): void {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const currentDate = document.querySelector("#due_date");

    let dueDate = month[this.currMonth] + " - 15";

    this.dueDate = dueDate;
    this.getBill(this.currMonth);
  }

  getBill(currMonth: number) {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.water = bills.filter(x => x.type == 'water' && x.month == currMonth + 1)[0].amount;
          this.gas = bills.filter(x => x.type == 'gas' && x.month == currMonth + 1)[0].amount;
          this.electricity = bills.filter(x => x.type == 'electricity' && x.month == currMonth + 1)[0].amount;
        }

        this.total = 0;
        let lastTotal = 0;

        this.total = Math.round(this.water / 6 + this.gas / 6 + this.electricity / 6 + this.member!.rentalFee);
        lastTotal = Math.round(this.water / 6 + this.gas / 6 + this.electricity / 6 + this.member!.lastRentalFee);
        this.percentChange = Math.abs((this.total - lastTotal) / lastTotal * 100).toFixed(2);

        if (this.total > lastTotal) this.higher = true;
        else this.higher = false;
      }
    })
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.getBill(this.currMonth);
    this.reloadMember.emit(false);
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

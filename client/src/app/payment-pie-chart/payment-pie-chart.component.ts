import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Bill } from '../_models/bill';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-payment-pie-chart',
  templateUrl: './payment-pie-chart.component.html',
  styleUrls: ['./payment-pie-chart.component.css']
})
export class PaymentPieChartComponent implements OnInit {
  @Input() member: Member | undefined;
  @Input() bills: Bill[] | undefined;
  @Output() reloadMember = new EventEmitter();

  water: number = 0;
  gas: number = 0;
  electricity: number = 0;
  insurance: number = 0;
  internet: number = 0;
  mobile: number = 0;
  owed_water: number = 0;

  chartOptions = {};
  isVisible: boolean = true;
  date = new Date();
  currMonth = this.date.getMonth();
  data: any = [];
  user: User | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnChanges() {
    if (this.member && this.bills && this.bills.length > 0) {

      if (!this.user?.roles.includes('Admin')) {
        this.water = this.bills.filter(x => x.type == 'water' && x.month == this.currMonth + 1)[0].amount;
        this.gas = this.bills.filter(x => x.type == 'gas' && x.month == this.currMonth + 1)[0].amount;
        this.electricity = this.bills.filter(x => x.type == 'electricity' && x.month == this.currMonth + 1)[0].amount;

        this.data = [];

        this.data.push({ y: this.member!.rentalFee, name: "Room" });
        this.data.push({ y: this.electricity / 6, name: "Electricity" });
        this.data.push({ y: this.water / 6, name: "Water" });
        this.data.push({ y: this.gas / 6, name: "Gas" });

        if (this.member.userName == "thao" || this.member.userName == "thang") {
          this.data.push({ y: 60, name: "Owed Water" });
        }

        if (this.member.userName == "thang") {
          this.data.push({ y: 42, name: "Sim Data" });
        }
      }
      else {
        this.water = this.bills.filter(x => x.type == 'water' && x.month == this.currMonth + 1)[0].amount;
        this.gas = this.bills.filter(x => x.type == 'gas' && x.month == this.currMonth + 1)[0].amount;
        this.electricity = this.bills.filter(x => x.type == 'electricity' && x.month == this.currMonth + 1)[0].amount;
        this.insurance = this.bills.filter(x => x.type == 'insurance' && x.month == this.currMonth + 1)[0].amount;
        this.internet = this.bills.filter(x => x.type == 'internet' && x.month == this.currMonth + 1)[0].amount;
        this.mobile = this.bills.filter(x => x.type == 'mobile' && x.month == this.currMonth + 1)[0].amount;
        this.owed_water = this.bills.filter(x => x.type == 'owed_water' && x.month == this.currMonth + 1)[0].amount;

        this.data = [];
        this.data.push({ y: this.electricity, name: "Electricity" });
        this.data.push({ y: this.water, name: "Water" });
        this.data.push({ y: this.gas, name: "Gas" });
        this.data.push({ y: this.insurance, name: "Insurance" });
        this.data.push({ y: this.internet, name: "Internet" });
        this.data.push({ y: this.mobile, name: "Mobile" });
        this.data.push({ y: this.owed_water, name: "Owed Water" });
      }

      this.chartOptions = {
        animationEnabled: true,
        title: {
          text: "Payment Breakdown"
        },
        data: [{
          type: "doughnut",
          yValueFormatString: "'$'#,###.##",
          indexLabel: "{name}",
          dataPoints: [
            ...this.data
          ]
        }]
      }
    }
  }

  ngOnInit(): void {
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.reloadMember.emit(false);
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

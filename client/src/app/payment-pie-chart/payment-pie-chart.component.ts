import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from '../_models/bill';
import { Member } from '../_models/member';
import { BillService } from '../_services/bill.service';

@Component({
  selector: 'app-payment-pie-chart',
  templateUrl: './payment-pie-chart.component.html',
  styleUrls: ['./payment-pie-chart.component.css']
})
export class PaymentPieChartComponent implements OnInit {
  @Input() member: Member | undefined;
  water: number = 0;
  gas: number = 0;
  electricity: number = 0;
  roomPercent: number = 0;
  waterPercent: number = 0;
  gasPercent: number = 0;
  electricityPercent: number = 0;
  chartOptions = {};
  isVisible: boolean = true;
  date = new Date();
  currMonth = this.date.getMonth();

  constructor(private billService: BillService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBills(this.currMonth);
  }

  getBills(currMonth: number) {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.water = bills.filter(x => x.type == 'water' && x.month == currMonth + 1)[0].amount;
          this.gas = bills.filter(x => x.type == 'gas' && x.month == currMonth + 1)[0].amount;
          this.electricity = bills.filter(x => x.type == 'electricity' && x.month == currMonth + 1)[0].amount;
        }

        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: "Payment Breakdown"
          },
          data: [{
            type: "doughnut",
            yValueFormatString: "#,###.##'$'",
            indexLabel: "{name}",
            dataPoints: [
              { y: this.member!.rentalFee, name: "Room" },
              { y: this.electricity / 6, name: "Electricity" },
              { y: this.water / 6, name: "Water" },
              { y: this.gas / 6, name: "Gas" }
            ]
          }]
        }
      }
    })
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
    this.getBills(this.currMonth);
    this.toastr.success("Refresh successfully!");
  }
}

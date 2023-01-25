import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from '../_models/bill';
import { Member } from '../_models/member';

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
  
  chartOptions = {};
  isVisible: boolean = true;
  date = new Date();
  currMonth = this.date.getMonth();

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnChanges() {
    if (this.member && this.bills && this.bills.length > 0) {
      this.water = this.bills.filter(x => x.type == 'water' && x.month == this.currMonth + 1)[0].amount;
      this.gas = this.bills.filter(x => x.type == 'gas' && x.month == this.currMonth + 1)[0].amount;
      this.electricity = this.bills.filter(x => x.type == 'electricity' && x.month == this.currMonth + 1)[0].amount;

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
            { y: this.member!.rentalFee, name: "Room" },
            { y: this.electricity / 6, name: "Electricity" },
            { y: this.water / 6, name: "Water" },
            { y: this.gas / 6, name: "Gas" }
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

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from '../_models/bill';
import { BillService } from '../_services/bill.service';

@Component({
  selector: 'app-bill-chart',
  templateUrl: './bill-chart.component.html',
  styleUrls: ['./bill-chart.component.css']
})
export class BillChartComponent implements OnInit {
  bills: Bill[] = [];
  water: Bill[] = [];
  gas: Bill[] = [];
  electricity: Bill[] = [];
  chartOptions = {};
  isVisible: boolean = true;
  date = new Date();
  title = "Bill Report - " + this.date.getFullYear()

  constructor(private billService: BillService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getBill(this.title);
  }

  getBill(title: string) {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills.filter(x => x.amount != 0);
          this.water = this.bills.filter(x => x.type == 'water');
          this.gas = this.bills.filter(x => x.type == 'gas');
          this.electricity = this.bills.filter(x => x.type == 'electricity');

          this.chartOptions = {
            animationEnabled: true,
            theme: "light2",
            title: {
              text: title
            },
            axisX: {
              valueFormatString: "MMM",
              intervalType: "month",
              interval: 1
            },
            axisY: {
              title: "Cost",
              prefix: "$"
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: "pointer",
              itemclick: function (e: any) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
                } else {
                  e.dataSeries.visible = true;
                }
                e.chart.render();
              }
            },
            data: [{
              type: "line",
              name: "Water",
              showInLegend: true,
              yValueFormatString: "$#,###",
              dataPoints: [
                ...this.processArray(this.water)
              ]
            },
            {
              type: "line",
              name: "Electricity",
              showInLegend: true,
              yValueFormatString: "$#,###",
              dataPoints: [
                ...this.processArray(this.electricity)
              ]
            },
            {
              type: "line",
              name: "Gas",
              showInLegend: true,
              yValueFormatString: "$#,###",
              dataPoints: [
                ...this.processArray(this.gas)
              ]
            }]
          }
        }
      }
    })
  }

  private processArray(input: Bill[]) {
    let returnArray: any = [];
    for (let i = 0; i < input.length; i++) {
      returnArray.push({
        x: new Date(2023, i, 1), y: input[i].amount
      })
    }

    return returnArray;
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.getBill(this.title);
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

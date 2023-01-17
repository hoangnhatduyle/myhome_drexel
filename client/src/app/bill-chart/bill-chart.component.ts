import { Component, OnInit } from '@angular/core';
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

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getBills().subscribe({
      next: bills => {
        if (bills) {
          this.bills = bills;
          this.water = this.bills.filter(x => x.type == 'water');
          this.gas = this.bills.filter(x => x.type == 'gas');
          this.electricity = this.bills.filter(x => x.type == 'electricity');

          this.chartOptions = {
            animationEnabled: true,
            theme: "light2",
            title: {
              text: "Bill Report - 2023"
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
    let returnArray : any = [];
    for (let i = 0; i < input.length; i++) {
      returnArray.push({
        x: new Date(2023, i, 1), y: input[i].amount
      })
    }

    return returnArray;
  }

}

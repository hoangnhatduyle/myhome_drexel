import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from '../_models/bill';

@Component({
  selector: 'app-bill-chart',
  templateUrl: './bill-chart.component.html',
  styleUrls: ['./bill-chart.component.css']
})
export class BillChartComponent implements OnInit {
  @Output() reloadMember = new EventEmitter();
  @Input() bills: Bill[] | undefined;
  water: Bill[] = [];
  gas: Bill[] = [];
  electricity: Bill[] = [];
  chartOptions = {};
  isVisible: boolean = true;
  date = new Date();
  title = "Bill Report - " + this.date.getFullYear()

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnChanges() {
    if (this.bills && this.bills.length > 0) {
      this.bills = this.bills.filter(x => x.amount != 0);
      this.water = this.bills.filter(x => x.type == 'water').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.gas = this.bills.filter(x => x.type == 'gas').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);
      this.electricity = this.bills.filter(x => x.type == 'electricity').sort((a, b) => a.month < b.month ? -1 : a.month > b.month ? 1 : 0);

      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: this.title
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
        data: [
          {
            type: "line",
            name: "Gas",
            showInLegend: true,
            yValueFormatString: "$#,###",
            dataPoints: [
              ...this.processArray(this.gas)
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
            name: "Water",
            showInLegend: true,
            yValueFormatString: "$#,###",
            dataPoints: [
              ...this.processArray(this.water)
            ]
          }
        ]
      }
    }
  }

  ngOnInit(): void {

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
    this.reloadMember.emit(false);
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

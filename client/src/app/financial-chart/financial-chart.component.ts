import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FinancialReport } from '../_models/financialReport';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-chart',
  templateUrl: './financial-chart.component.html',
  styleUrls: ['./financial-chart.component.css']
})
export class FinancialChartComponent implements OnInit {
  @Output() reloadMember = new EventEmitter();
  @Input() financialReport: FinancialReport[] | undefined;
  isVisible: boolean = true;
  chartOptions = {};
  date = new Date();
  title = "Net Income Report - " + this.date.getFullYear()

  constructor(private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnChanges() {
    if (this.financialReport && this.financialReport.length > 0) {
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
          title: "Net Income",
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
            name: "Net Income",
            color: "green",
            showInLegend: true,
            yValueFormatString: "$#,###",
            dataPoints: [
              ...this.processArray(this.financialReport)
            ]
          }
        ]
      }
    }
  }

  ngOnInit(): void {

  }

  private processArray(input: FinancialReport[]) {
    let returnArray: any = [];
    for (let i = 0; i < input.length; i++) {
      returnArray.push({
        x: new Date(2023, i, 1), y: input[i].netIncome
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

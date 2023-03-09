import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bill } from '../_models/bill';
import { Payment } from '../_models/payment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FinancialReport } from '../_models/financialReport';

@Component({
  selector: 'app-financial-modal',
  templateUrl: './financial-modal.component.html',
  styleUrls: ['./financial-modal.component.css']
})
export class FinancialModalComponent implements OnInit {
  id: number = 0;
  report: FinancialReport | undefined;
  
  payments: Payment[] = [];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  chartOptions = {};

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    let data = [];

    data.push({ y: this.report?.electricityBill, name: "Electricity" });
    data.push({ y: this.report?.gasBill, name: "Gas" });
    data.push({ y: this.report?.waterBill, name: "Water" });
    data.push({ y: this.report?.insuranceBill, name: "Insurance" });
    data.push({ y: this.report?.internetBill, name: "Internet" });
    data.push({ y: this.report?.mobileBill, name: "Mobile" });
    data.push({ y: this.report?.owedWaterBill, name: "Owed Water" });

    this.chartOptions = {
      animationEnabled: true,
      width: 350,
      height: 235,
      data: [{
        type: "doughnut",
        yValueFormatString: "'$'#,###.##",
        indexLabel: "{name}",
        dataPoints: [
          ...data
        ]
      }]
    }
  }

  printPDF() {
    const div = document.getElementById("html2Pdf_month");
    const options = { background: "gray", height: div!.clientHeight, width: div!.clientWidth };

    html2canvas(div!, options).then((canvas) => {
      let fileWidth = 287;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      //Initialize JSPDF
      let doc = new jsPDF();
      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 5, 5, fileWidth, fileHeight);

      let pdfOutput = doc.output();

      //Name of pdf
      const fileName = "FinancialReport_" + this.months[this.report!.month - 1] + this.report?.year + ".pdf";

      // Make file
      doc.save(fileName);

    });
  }

}

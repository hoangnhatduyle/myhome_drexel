import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent implements OnInit {
  row1Select: number = 0
  row2Select: number = 0
  row3Select: number = 0
  row4Select: number = 0
  model: any = {};

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  actionMethod(event: any, row: number, rate: number) {
    switch (row) {
      case 1:
        if (this.row1Select == 0) this.row1Select = rate;
        else {
          document.getElementById('btn-row1-' + this.row1Select).classList.remove('clicked');
          this.row1Select = rate;
        }
        this.model.webDesign = this.row1Select;
        break;

      case 2:
        if (this.row2Select == 0) this.row2Select = rate;
        else {
          document.getElementById('btn-row2-' + this.row2Select).classList.remove('clicked');
          this.row2Select = rate;
        }
        this.model.webLoading = this.row2Select;
        break;

      case 3:
        if (this.row3Select == 0) this.row3Select = rate;
        else {
          document.getElementById('btn-row3-' + this.row3Select).classList.remove('clicked');
          this.row3Select = rate;
        }
        this.model.webNavigation = this.row3Select;
        break;

      case 4:
        if (this.row4Select == 0) this.row4Select = rate;
        else {
          document.getElementById('btn-row4-' + this.row4Select).classList.remove('clicked');
          this.row4Select = rate;
        }
        this.model.webInfo = this.row4Select;
        break;
    }
    event.target.classList.toggle("clicked");
  }

  submitReview() {
    var Email = require('./../../assets/smtp.js');

    var bodyHtml = "<div style='width: 40%; display: flex; justify-content: center; margin: auto; color: black;'> <div> <div style='display: flex; padding-top: 20px;'><img style='max-height: 30px; margin-right: auto;' src='https://drive.google.com/uc?export=view&id=1xzzz5GlCCovVVRZ4cTxxgRTR2Bea5P4S'><span style='font-size: 18px; font-weight: bold;'>Feedback Notification</span></div> <hr> <div>We have 1 new feedback from customer:</div>";

    bodyHtml += `<div style='margin-top: 20px; margin-bottom: 20px; padding: 5px 5px; border: 0.5px solid gray;'><b>Rate: ${this.model.rate} star(s).<br>Elaboration:  ${this.model.elaboration}.<br>Website Design: ${this.model.webDesign}.<br>Website Loading: ${this.model.webLoading}.<br>Website Navigation: ${this.model.webNavigation}.<br>Website Information: ${this.model.webInfo}.<br>Things to improve: ${this.model.improve}.</div>`;

    bodyHtml += "<div>Best wishes,<div><br> <div><b>myHome Feedback Notification</b> <div> <div style='font-style: italic;'>Customer Service</div><br> <div>3843 Drexel Drive | Toledo, OH | 43612</div> <div>Phone Number: 419-699-9535</div> <div>Email: lehoangnhatduy2000@gmail.com</div><br> </div> </div> </div> </div> </div> </div>";

    Email.send({
      SecureToken: "45347233-f706-4605-a56a-e522e578b0c5",
      To: "lehoangnhatduy2000@gmail.com",
      From: "myhomecsupp@gmail.com",
      Subject: "Feedback Notification",
      Body: bodyHtml
    }).then(
      () => {
        this.toastr.success("You have submitted the review. Thank you for giving your feedback.");
        this.model = {};
      }
    );
  }
}

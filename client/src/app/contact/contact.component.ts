import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_posa4p3', 'template_uloyl25', e.target as HTMLFormElement, 'YX7ijBeJSEuuOp_FO')
      .then((result: EmailJSResponseStatus) => {
        this.toastr.success("Thanks for contacting. I will reply soon.")
      }, (error) => {
        this.toastr.error("There was am error sending the email. Please try again.")
      });
  }
}

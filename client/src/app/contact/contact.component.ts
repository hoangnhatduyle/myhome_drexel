import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model: any = {};

  constructor(private toastr: ToastrService, private memberService: MembersService) { }

  ngOnInit(): void {
  }

  sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_posa4p3', 'template_uloyl25', e.target as HTMLFormElement, 'YX7ijBeJSEuuOp_FO')
      .then((result: EmailJSResponseStatus) => {
        this.memberService.addNewMessage(this.model).subscribe({
          next: _ => {
            this.toastr.success("Thanks for contacting. I will reply soon.");
            this.model = {};
          },
          error: error => {
            this.toastr.error(error)
          }
        })
      }, (error) => {
        this.toastr.error("There was an error sending the email. Please try again.")
      });
  }
}

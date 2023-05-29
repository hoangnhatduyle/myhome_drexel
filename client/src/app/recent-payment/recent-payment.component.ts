import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NewPaymentModalComponent } from '../modals/new-payment-modal/new-payment-modal.component';
import { Member } from '../_models/member';
import { Payment } from '../_models/payment';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-recent-payment',
  templateUrl: './recent-payment.component.html',
  styleUrls: ['./recent-payment.component.css']
})
export class RecentPaymentComponent implements OnInit {
  @Input() member: Member | undefined;
  @Output() reloadMember = new EventEmitter();

  dtOptions: DataTables.Settings = {};
  isVisible: boolean = true;
  user: User | null = null;
  payments: Payment[] = [];
  bsModalRef: BsModalRef<NewPaymentModalComponent> = new BsModalRef<NewPaymentModalComponent>();
  date = new Date();
  currMonth = this.date.getMonth();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  today: string = '';

  constructor(private memberService: MembersService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService, private modalService: BsModalService) {

  }

  ngOnChanges() {
    if (this.member) {
      this.payments = this.member.payment;
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        search: "",
        searchPlaceholder: 'Search...',
      },
      lengthMenu: [
        [5, 10, 25, -1],
        [5, 10, 25, 'All'],
      ]
    };

    this.today = (this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" + this.date.getFullYear()
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.reloadMember.emit(false);
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }

  openNewPaymentModal() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {}
    }
    this.bsModalRef = this.modalService.show(NewPaymentModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const values = this.bsModalRef.content!.values;
        if (Object.keys(values).length === 0) return;
        this.memberService.addNewPayment(values).subscribe({
          next: (payment: Payment) => {
            this.toastr.success("Payment has been added successfully");
            this.payments.push(payment);
          },
          error: error => {
            this.toastr.error(error);
          }
        })
      }
    })
  }
}

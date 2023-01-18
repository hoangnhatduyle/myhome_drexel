import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillService } from '../_services/bill.service';

@Component({
  selector: 'app-recent-payment',
  templateUrl: './recent-payment.component.html',
  styleUrls: ['./recent-payment.component.css']
})
export class RecentPaymentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  isVisible: boolean = true;

  constructor(private billService: BillService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

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
  }

  rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
    this.toastr.success("Refresh successfully!");
  }
}

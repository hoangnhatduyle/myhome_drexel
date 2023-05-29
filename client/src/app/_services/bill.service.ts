import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from '../_models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  baseUrl = environment.apiUrl;
  bills: Bill[] = [];

  constructor(private http: HttpClient) { }

  getBills(refetch: boolean = false) {
    if (refetch) {
      return this.http.get<Bill[]>(this.baseUrl + 'bill').pipe(
        map(bills => {
          this.bills = bills;
          return bills;
        })
      )
    }
    else {
      if (this.bills.length > 0) return of(this.bills);
      return this.http.get<Bill[]>(this.baseUrl + 'bill').pipe(
        map(bills => {
          this.bills = bills;
          return bills;
        })
      )
    }
  }

  getBillsByType(type: string) {
    return this.http.get<Bill[]>(this.baseUrl + 'bill/' + type);
  }

  updateBillAmount(id: number, amount: number, dueDate: any, paidDate: any, usernames: string[]) {
    return this.http.put(this.baseUrl + 'admin/edit-bill-amount/' + id, { "amount": amount, "usernames": usernames, "dueDate": dueDate, "paidDate": paidDate })
  }

  removeBill(id: number) {
    return this.http.delete(this.baseUrl + 'bill/' + id);
  }

  updateBillStatus(id: number, billStatus: boolean) {
    return this.http.put(this.baseUrl + 'admin/edit-bill-status/' + id + '/' + billStatus, {});    
  }
}

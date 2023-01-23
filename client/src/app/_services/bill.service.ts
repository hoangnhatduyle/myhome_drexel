import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bill } from '../_models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBills() {
    return this.http.get<Bill[]>(this.baseUrl + 'bill')
  }

  getBillsByType(type: string) {
    return this.http.get<Bill[]>(this.baseUrl + 'bill/' + type);
  }

  updateBill(id: number, amount: number, usernames: string[]) {
    return this.http.put<number>(this.baseUrl + 'admin/edit-bill-amount/' + id, {"amount": amount, "usernames": usernames})
  }

  removeBill(id: number) {
    return this.http.delete(this.baseUrl + 'bill/' + id);    
  }
}
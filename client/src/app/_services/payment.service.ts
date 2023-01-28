import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPendingPayments() {
    return this.http.get<Payment[]>(this.baseUrl + 'admin/payment-to-approve');
  }

  getPastPayments() {
    return this.http.get<Payment[]>(this.baseUrl + 'admin/past-payment');
  }

  approvePayment(model: any) {
    return this.http.put(this.baseUrl + 'admin/approve-payment/', model);
  }

  rejectPayment(id: number) {
    return this.http.put(this.baseUrl + 'admin/reject-payment/' + id, {});    
  }
}
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

  getAllPayments() {
    return this.http.get<Payment[]>(this.baseUrl + 'admin/payment-to-approve');
  }

  approvePayment(id: number) {
    return this.http.put(this.baseUrl + 'admin/approve-payment/' + id, {});
  }

  rejectPayment(id: number) {
    return this.http.put(this.baseUrl + 'admin/reject-payment/' + id, {});    
  }
}
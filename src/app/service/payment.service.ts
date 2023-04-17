import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export default class PaymentService {
  apiUrl = '';

  constructor(private http: HttpClient) {}

  submitPayment(body: any) {
    return this.http.post(this.apiUrl, body);
  }
}

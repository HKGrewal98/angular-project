import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormData } from '../ContactUs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = 'http://localhost:8080/contact';

  constructor(private http: HttpClient) { }

  getContactDetails(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
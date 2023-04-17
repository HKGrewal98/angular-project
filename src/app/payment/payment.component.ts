import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PaymentService from '../service/payment.service';
import { JWT } from '../JWT';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../User';
import { Address } from '../Address';
import { UserOrder } from '../UserOrder';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  jwt: JWT = { accessToken: '' };
  user!: User;
  amount=0;
  address!:Address;
  items!:UserOrder[];
  constructor(private http: HttpClient, private userOrder: OrderService, private route: Router, private formBuilder: FormBuilder, private paymentService: PaymentService) {
    console.log("Payment Page Constructor")
    this.generateJWT();
    userOrder.user.subscribe((value) => {
      this.user=value;
      console.log(value)
      if (value.id === '') {
        localStorage.clear()
        route.navigateByUrl('/')
      }
    })
    userOrder.amount.subscribe((value) => {
      this.amount=value;
      console.log(value)
    })
    userOrder.userAddress.subscribe((value) => {
      this.address=value;
      console.log(value)
    })
    userOrder.itemsOrdered.subscribe((value) => {
      this.items=value;
      console.log(value)
    })

  }

  paymentForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]*$/), Validators.minLength(4)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(16)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(3)]],
    paymentMode: ['credit']
  });
  generateJWT() {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ "clientId": "frontend" })
    this.http.post('http://localhost:8080/web/getToken', body, { 'headers': headers })
      .subscribe(
        (data: any) => {
          if (data.hasOwnProperty('accessToken')) {
            this.jwt.accessToken = data.accessToken
            console.log(this.jwt)
          }
        },
        (error) => {
          console.log(error)
        }
      )

  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);


      const body = {
        user: this.user,
        orderAddress: this.address,
        userOrder: this.items,
        totalAmount: this.amount,
        payment: {
          name: this.paymentForm.value.name,
          cardNumber: this.paymentForm.value.cardNumber,
          cvv: this.paymentForm.value.cvv,
          expiry: this.paymentForm.value.expiry,
          paymentMode: this.paymentForm.value.paymentMode,
        },
      };
      //call post method
      const headers = { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*", Accept: "application/json", Authorization: this.jwt.accessToken }
      this.http.post('http://localhost:8080/order', body, { 'headers': headers })
        .subscribe(
          (response) => {
            console.log("Order placed succesfully");
            this.route.navigateByUrl('/ottomonMeals');
          },
          (error) => {
            console.log(error); // Handle error response here
          }
        );

    }


  }

}


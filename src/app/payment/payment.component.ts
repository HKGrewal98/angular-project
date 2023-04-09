import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(private userOrder: OrderService,private route:Router){
      console.log("Payment Page Constructor")
      userOrder.user.subscribe((value) => {
        console.log(value)
        if(value.id===''){
             localStorage.clear()
             route.navigateByUrl('/')
        }
      })
      userOrder.amount.subscribe((value) => {
        console.log(value)
      })
      userOrder.userAddress.subscribe((value) => {
        console.log(value)
      })
      userOrder.itemsOrdered.subscribe((value) => {
        console.log(value)
      })

  }

}

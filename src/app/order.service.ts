import { Injectable } from '@angular/core';
import { Subject , BehaviorSubject } from 'rxjs';
import { User } from './User';
import { Address } from './Address';
import { UserOrder } from './UserOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  user = new BehaviorSubject<User>({id:'',name:'',email:'',phone:''});
  amount = new BehaviorSubject<number>(0);
  userAddress = new BehaviorSubject<Address>({postal:'',city:'',houseNo:'',street:''});
  itemsOrdered = new BehaviorSubject<Array<UserOrder>>([]);

  raiseUserEvent(data: User){
    console.log(data)
    this.user.next(data)
  }
  getUser(){
    return this.user.value;
  }
 
  setOrderAmount(data: number){
    console.log(data)
    this.amount.next(data)
  }

  setUserAddress(data: Address){
    console.log(data)
    this.userAddress.next(data)
  }

  setUserOrder(data: Array<UserOrder>){
    console.log(data)
    this.itemsOrdered.next(data)
  }


  
}

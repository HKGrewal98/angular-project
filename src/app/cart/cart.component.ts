import { Component,Output,EventEmitter,Input } from '@angular/core';
import { Meal } from '../Meal';
import { Address } from '../Address';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Output() closeCart = new EventEmitter<boolean>()
  @Output() addItem = new EventEmitter<Meal>()
  @Output() removeItem = new EventEmitter<Meal>()
  @Output() orderAddress = new EventEmitter<Address>()
  @Input()  cartItems :Array<Meal> = []
  @Input()  totalAmount :number = 0
  @Input()  itemsCountMap :Array<{_id:string,count:number}> = []
  userAddress = new FormGroup({
    houseNo:new FormControl('',[Validators.required]),
    street:new FormControl('',[Validators.required]),
    postalCode : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(7)]),
    city: new FormControl('',[Validators.required])
  })
  confirmOrder = false

  
  disableCart(open :boolean){
    this.closeCart.emit(open)
  }

  getItemCount(id :string){
    const item = this.itemsCountMap.find((data) => data._id === id)
    if(item){
      return item.count
    }else{
      return 0
    }
  }

  addMeal(meal :Meal){
     this.addItem.emit(meal)
  }

  removeMeal(meal :Meal){
     this.removeItem.emit(meal)
  }

  enableOrderCapture(){
    if(this.cartItems.length > 0){
        this.confirmOrder = true
    }
  }

  userAddressSubmit(){
    console.log(this.userAddress.value)
    //this.disableCart(false)
    //this.orderAddress.emit(data)
  }
  
  get houseNo() {
    return this.userAddress.get('houseNo')
  }

  get street(){
    return this.userAddress.get('street')
  }

  get postalCode(){
    return this.userAddress.get('postalCode')
  }

  get city(){
    return this.userAddress.get('city')
  }
}

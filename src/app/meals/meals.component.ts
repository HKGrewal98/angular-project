import { Component,Input,OnInit,Output,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JWT } from '../JWT';
import { Meal } from '../Meal';
import { Address } from '../Address';
import { OrderService } from '../order.service';
import { User } from '../User';
import { UserOrder } from '../UserOrder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent {
  jwt :JWT = {accessToken:''}
  menuItems :Array<Meal> = []
  cartItems :Array<Meal> = [] // items selected by the user.......
  totalAmount :number = 0 // total bill for the selected items.......
  itemsCountMap :Array<{_id:string,count:number}> = []
  userAddress :Address = {houseNo:'',city:'',postal:'',street:''}// user Address
  openCart = false

  constructor(private http: HttpClient,private userOrder: OrderService,private route: Router) {
    this.generateJWT() 
  }

  clearAll(){
    this.cartItems = []
    this.totalAmount = 0
    this.itemsCountMap = []
    this.openCart = false 
    this.userAddress = {houseNo:'',city:'',postal:'',street:''}
   }

   generateJWT(){
   const headers = { 'content-type': 'application/json'}  
   const body = JSON.stringify({"clientId":"frontend"}) 
   this.http.post('http://localhost:8080/web/getToken', body,{'headers':headers})  
   .subscribe((data :any) => {
     if(data.hasOwnProperty('accessToken')){
          this.jwt.accessToken = data.accessToken
          console.log(this.jwt.accessToken)
          this.getMealItems()
     }}) 
  }

  getMealItems(){
      console.log("meals")
      console.log(this.jwt.accessToken)
      const headers = { 'content-type': 'application/json' ,  "Authorization" : this.jwt.accessToken} 
      this.http.get('http://localhost:8080/menu?allItems=true',{'headers':headers})
      .subscribe((data :any)=>{
        console.log(data)
        this.menuItems = data
        console.log(this.menuItems.length)
      })
  }


  getItemCount(id :string){
    const item = this.itemsCountMap.find((data) => data._id === id)
    return item ? item.count : 0
  }

  validate(id :string){
    const item = this.itemsCountMap.find((data) => data._id === id)
    if(item){
          if(item.count===10){
              return false
          }
    }
    return true;
}

addItem(meal :Meal){
  if(!this.validate(meal._id)){
       alert("Maximun amount of a particular item can be 10 only.")
       console.log("Maximum amount validation failed.")
       return
  }
  console.log(meal)
  let item = this.cartItems.find((data) => data._id === meal._id)
  this.totalAmount = this.totalAmount + meal.price
  if(!item){
    this.cartItems.push(meal)
  }
  
  let itemCount = this.itemsCountMap.find((data) => data._id === meal._id)
  if(itemCount){
        itemCount.count = itemCount.count + 1
  }else{
        this.itemsCountMap.push({_id:meal._id,count:1})
  }
  
   console.log(this.totalAmount)
   console.log(this.cartItems)
   console.log(this.itemsCountMap)

}// addItem ends....

deleteItem(meal :Meal){
  let itemCount = this.itemsCountMap.find((data) => data._id === meal._id)
  if(itemCount){
       this.totalAmount = this.totalAmount - meal.price
        if(itemCount.count===1){
               this.itemsCountMap = this.itemsCountMap.filter((data) => data._id !== meal._id)
               this.cartItems = this.cartItems.filter((data) => data._id !== meal._id)        
        }else{
              itemCount.count = itemCount.count-1
        }

  }// main if ends.......
}// deleteItem ends.......

enableCart(open :boolean){
  this.openCart = open
  console.log(this.openCart)
}

setUserAddress(data :Address){
this.userAddress = data
console.log(this.userAddress)
this.enableCart(false)
this.userOrder.setOrderAmount(this.totalAmount)
this.userOrder.setUserAddress(this.userAddress)
this.userOrder.setUserOrder(this.generateUserOrderObject())
this.route.navigateByUrl('/payment')
// enable the payment page 
}

generateUserOrderObject(){

   let orderDetails: Array<UserOrder> = []

    this.cartItems.forEach((item)=>{
          const id = item._id
          const foundItem = this.itemsCountMap.find((itemId) => itemId._id===id)
          if(foundItem){
              let totalPrice = foundItem.count * item.price
              orderDetails.push({
                id:id,
                amount:foundItem.count,
                price:totalPrice
              })
          }    
    })

    return orderDetails
}


}

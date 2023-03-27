import { Component , Input} from '@angular/core';
import { Meal } from './Meal';
import { Address } from './Address';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'capstone-angular';
  cartItems :Array<Meal> = []
  totalAmount :number = 0
  itemsCountMap :Array<{_id:string,count:number}> = []
  openCart = false
  isUserLogined=true
  @Input() userAddress :Address = {houseNo:'',city:'',postalCode:'',street:''}
  constructor(private http: HttpClient) {}

  clearAll(){
   this.cartItems = []
   this.totalAmount = 0
   this.itemsCountMap = []
   this.openCart = false 
   this.userAddress = {houseNo:'',city:'',postalCode:'',street:''}
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
  }

}

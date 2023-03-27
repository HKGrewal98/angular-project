import { Component,Input,OnInit,Output,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JWT } from '../JWT';
import { Meal } from '../Meal';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent {
  jwt :JWT = {accessToken:''}
  meal :Array<Meal> = []
  @Output() newItemEvent = new EventEmitter<Meal>()
  @Input() itemsCountMap :Array<{_id:string,count:number}> = []                   

  constructor(private http: HttpClient) {this.generateJWT() }


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
        this.meal = data
        console.log(this.meal.length)
      })
  }


  addItem(meal :Meal){
      this.newItemEvent.emit(meal)
  }
  
  getItemCount(id :string){
    const item = this.itemsCountMap.find((data) => data._id === id)
    return item ? item.count : 0
  }


}

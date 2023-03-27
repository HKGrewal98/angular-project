import { Component,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Output() openCart = new EventEmitter<boolean>()
@Input()   itemsCountMap :Array<{_id:string,count:number}> = []

enableCart(open :boolean){
  this.openCart.emit(open)
}

getItemsCountInCart(){
 return this.itemsCountMap.reduce((count,item) =>{
      return count + item.count
  },0)
}


}

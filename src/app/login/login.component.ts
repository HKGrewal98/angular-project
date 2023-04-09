import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JWT } from '../JWT';
import { Router } from '@angular/router';
import { onErrorResumeNext, onErrorResumeNextWith } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  jwt :JWT = {accessToken:''}
  signUp = {
    name:'',
    email:'',
    password:''
  }
  error=false
  message=""
  

  constructor(private http: HttpClient,private router: Router,private userOrder: OrderService) {
   this.generateJWT()
   localStorage.clear()
  }

  onload(){
    console.log("OnLoad")
    if(localStorage.getItem("isLoggedIn") && localStorage.getItem("isLoggedIn")==="true"){
      this.router.navigateByUrl('/ottomonMeals')
    }
  }

  userSignUp(data :any){
      console.log(data)
      data['phone'] = '1234554321'
      const headers = { 'content-type': 'application/json','Authorization':this.jwt.accessToken}  
      const body = JSON.stringify(data) 
      console.log(body)
      this.http.post('http://localhost:8080/user/signUp',body,{'headers':headers})
      .subscribe( 
        (data :any) => {
             console.log(data)
             this.message = "User Registered Successfully."
            this.error=true
      },
      (error) =>{
            console.log(error.error)
            this.message = error?.error.message
            this.error=true
        }
      )
     
  }

  generateJWT(){
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify({"clientId":"frontend"}) 
    this.http.post('http://localhost:8080/web/getToken', body,{'headers':headers})  
    .subscribe(
      (data :any) => {
      if(data.hasOwnProperty('accessToken')){
          this.jwt.accessToken = data.accessToken
          console.log(this.jwt)
      }},
      (error) =>{
          console.log(error)
      }
      ) 
    
  }

  validateUser(data :any){
    const headers = { 'content-type': 'application/json','Authorization':this.jwt.accessToken}  
    const body = JSON.stringify(data) 
    console.log(body)
    this.http.post('http://localhost:8080/user/signIn',body,{'headers':headers})
    .subscribe( 
      (data :any) => {
           console.log(data)
           localStorage.setItem("isLoggedIn","true")
           this.userOrder.raiseUserEvent(data.user)
           this.router.navigateByUrl('/ottomonMeals')
    },
    (error) =>{
          console.log(error.error)
          this.message = error?.error.message
          this.error=true
      }
    )
  }


}

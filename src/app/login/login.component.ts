import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JWT } from '../JWT';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  jwt :JWT = {accessToken:''}
  signUp = {
    name:'',
    email:'',
    password:''
  }
  constructor(private http: HttpClient) {}

  userSignUp(data :any){
      console.log(data)
  }

  userLogin(loginDetails :any){
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify({"clientId":"frontend"}) 
    this.http.post('http://localhost:8080/web/getToken', body,{'headers':headers})  
    .subscribe((data :any) => {
      if(data.hasOwnProperty('accessToken')){
          this.jwt.accessToken = data.accessToken
          console.log(this.jwt)
          this.validateUser(loginDetails)
      }}) 
  }

  validateUser(data :any){
    const headers = { 'content-type': 'application/json','Authorization':this.jwt.accessToken}  
    const body = JSON.stringify(data) 
    console.log(body)
    this.http.post('http://localhost:8080/user/signIn',body,{'headers':headers})
    .subscribe( (data :any) => {
           console.log(data)
    })
  }

}

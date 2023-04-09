import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router: Router) {
   
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      console.log(state.url)
      console.log(localStorage.getItem("isLoggedIn"))

      if((!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn")!=="true") && state.url==='/'){
           return true;
      }

    
      if(state.url==='/' && localStorage.getItem("isLoggedIn")==="true"){
        console.log("I am here")
        this.router.navigateByUrl("/ottomonMeals")
        return false
      }

      if(!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn")!=="true"){
        this.router.navigateByUrl("/")
           return false;
      }

    return true;
  }
  
}

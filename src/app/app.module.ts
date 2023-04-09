  import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MealsComponent } from './meals/meals.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/jobs.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { LogoutComponent } from './logout/logout.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MealsComponent,
    CartComponent,
    LoginComponent,
    JobsComponent,
    NavigationComponent,
    LogoutComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'ottomonMeals',component:MealsComponent,canActivate:[AuthguardGuard]},
      {path:'jobs',component:JobsComponent,canActivate:[AuthguardGuard]},
      {path:'', component:LoginComponent,canActivate:[AuthguardGuard]},
      {path:'logout',component:LogoutComponent,canActivate:[AuthguardGuard]},
      {path:'payment',component:PaymentComponent,canActivate:[AuthguardGuard]},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

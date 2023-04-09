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
}

import { Component, OnInit } from '@angular/core';
import { AboutService } from '../service/about-content.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit{

  contents: string[] = [];

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.contents = this.aboutService.getContent();
  }

}

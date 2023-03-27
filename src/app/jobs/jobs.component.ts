import { Component } from '@angular/core';
import { Jobs } from '../Jobs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs :Array<Jobs> = []
  constructor(private http: HttpClient) {this.fetchJobs()}

  fetchJobs(){
    this.http.get('http://localhost:8080/menu/jobs')
    .subscribe((data :any)=>{
      console.log(data)
      this.jobs = data
      console.log(this.jobs.length)
      console.log(this.jobs)
    })
  }


}

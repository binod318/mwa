import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../jobs-data.service';
import { Filter } from '../search/search.component';

export class Job {
  _id!:string;
  title!: string;
  salary!: number;
  //location
  description!: string;
  experience!: string;
  skills!: [string];
  postDate!: Date
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs:Job[] = [];
  pageSize:number=5;
  pageNumber:number=1;
  nextBtnDisable:boolean = false;

  constructor(private _jobsService: JobsDataService) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  onSizeChange(){
    this.fetchJobs();
  }

  fetchJobs(){
    const count = this.pageSize;
    const offset = (this.pageNumber - 1) * count;
    const filter = new Filter(count, offset, "");
    this._jobsService.getJobs(filter).subscribe(jobs => {
      this.jobs = jobs;

      //disable next button for last page
      this.nextBtnDisable = jobs.length < this.pageSize;
    })
  }

  onPrevious(){
    this.pageNumber--;
    this.fetchJobs();
  }

  onNext(){
    this.pageNumber++;
    this.fetchJobs();
  }

}

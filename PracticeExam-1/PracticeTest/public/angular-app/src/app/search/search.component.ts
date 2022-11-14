import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../jobs/jobs.component';

export class Filter {
  search!:string;
  count!:number;
  offset!:number;

  constructor(count:number, offset:number, search:string){
    this.count = count;
    this.offset = offset;
    this.search =search;
  }

  toQueryString(){
    let query = this.search ? `search=${this.search}` : '';
    query = this.count ? (query ? `${query}&` : '') + `count=${this.count}` : query;
    query = this.offset ? (query ? `${query}&` : '') + `offset=${this.offset}` : query;

    query = query ? '?'+ query : '';
    return query;
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search!: string;
  jobs:Job[] = [];

  constructor(private _jobsService:JobsDataService) { }

  ngOnInit(): void {
  }

  onSearch(){
    if(this.search){
      const filter = new Filter(0,0,this.search);
      this._jobsService.getJobs(filter).subscribe(jobs => {
        this.jobs = jobs;
      });
    }
      
  }
}

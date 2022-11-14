import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../jobs/jobs.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  job!:Job;

  constructor(private _jobsService:JobsDataService, private _route:ActivatedRoute) { 
    this.job = new Job();
  }

  ngOnInit(): void {
    const jobId = this._route.snapshot.params['jobId'];
    this._jobsService.getJob(jobId).subscribe(job => {
      this.job = job;
    });
  }

}

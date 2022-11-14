import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './jobs/jobs.component';
import { Filter } from './search/search.component';

@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  private _baseUrl:string = "http://localhost:3000/api";

  constructor(private _http:HttpClient) { }

  public getJobs(filter: Filter): Observable<Job[]>{
    const url = this._baseUrl + '/jobs' + filter.toQueryString();
    return this._http.get<Job[]>(url);
  }

  public getJob(jobId:string): Observable<Job>{
    const url = this._baseUrl + '/jobs/' + jobId;
    return this._http.get<Job>(url);
  }
}

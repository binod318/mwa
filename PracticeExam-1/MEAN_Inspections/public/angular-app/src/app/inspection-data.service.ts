import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inspection } from './inspections/inspections.component';

@Injectable({
  providedIn: 'root'
})
export class InspectionDataService {

  private _baseUrl: string= "http://localhost:3000/api";

  constructor(private _http:HttpClient) { }

  public getInspections(): Observable<Inspection[]>{
    const url = this._baseUrl + "/inspections";
    return this._http.get<Inspection[]>(url);
  }

  public getInspection(inspectionId:string): Observable<Inspection>{
    const url = this._baseUrl + "/inspections/" + inspectionId;
    return this._http.get<Inspection>(url);
  }

  public deleteinspection(inspectionId:string): Observable<void>{
    const url = this._baseUrl + "/inspections/" + inspectionId;
    return this._http.delete<void>(url);
  }
}

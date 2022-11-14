import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from './search/search.component';

import { Ship } from './ships/ships.component';

@Injectable({
  providedIn: 'root'
})
export class ShipsDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getShips(): Promise<Ship[]> {
    const url: string= this.apiBaseUrl + "/ships";

    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship[]})
                .catch(this.handleError);
  }

  public getFilteredShips(filter:Filter): Promise<Ship[]>{
    let url: string = this.apiBaseUrl + '/ships' + filter.toQueryString();
    return this.http.get(url).toPromise()
                      .catch(this.handleError);
  }

  public getShip(shipId: string): Promise<Ship> {
    const url: string= this.apiBaseUrl + "/ships/" + shipId;
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship})
                .catch(this.handleError);
  }

  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }
}

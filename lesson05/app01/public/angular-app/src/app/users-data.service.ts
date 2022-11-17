import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  private _baseUrl = "http://localhost:3000/api";

  constructor(private _http:HttpClient) { }

  public addUser(user:Credentials): Observable<Credentials> {
    const url = this._baseUrl + "/users";
    console.log('user', user);
    
    return this._http.post<Credentials>(url, user.ToJSON());
  }

  public login(user:Credentials): Observable<Object> {
    const url = this._baseUrl + "/users/login";
    return this._http.post<Object>(url, user.ToJSON());
  }
}

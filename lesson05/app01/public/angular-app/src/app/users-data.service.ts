import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfig } from 'src/config/urlconfig';
import { Credentials } from './login/login.component';
import { LoginToken } from './models/login-token';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private _http:HttpClient) { }

  public addUser(user:Credentials): Observable<Credentials> {
    const url = UrlConfig.addUserUrl;
    return this._http.post<Credentials>(url, user.ToJSON());
  }

  public login(user:Credentials): Observable<LoginToken> {
    const url = UrlConfig.loginUrl;
    return this._http.post<LoginToken>(url, user.ToJSON());
  }
}

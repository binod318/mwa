import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private _baseUrl = "http://localhost:3000/api";

  constructor(private _http:HttpClient) { }

  public getGames(): Observable<Game[]> {
    const url = this._baseUrl + "/games";
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2Njg4NjQzMjMsImV4cCI6MTY2ODg2NzkyM30.XjBnXMUXMWn_q7RVQKuJ0RTd4nj8qF4yYGjXzikfkr0'
    //   })
    // };

    return this._http.get<Game[]>(url);
  }

  public getGame(gameId: string): Observable<Game>{
    const url = this._baseUrl + "/games/" + gameId;
    return this._http.get<Game>(url);
  }

  public deleteGame(gameId: string): Observable<Game>{
    const url = this._baseUrl + "/games/" + gameId;
    return this._http.delete<Game>(url);
  }
}

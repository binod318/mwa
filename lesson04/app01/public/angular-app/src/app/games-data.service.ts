import { HttpClient } from '@angular/common/http';
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
    return this._http.get<Game[]>(url);
  }

  public getGame(gameId: string): Observable<Game>{
    const url = this._baseUrl + "/games/" + gameId;
    return this._http.get<Game>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  private _baseUrl: string = "http://localhost:3000/api";

  constructor(private _http: HttpClient) { }

  public getMovies(): Observable<Movie[]> {
    const url = this._baseUrl + "/movies"
    return this._http.get<Movie[]>(url);
  }

  public getMovie(movieId: string): Observable<Movie> {
    const url = this._baseUrl + "/movies/" + movieId;
    return this._http.get<Movie>(url);
  }

  public deleteMovie(movieId: string): Observable<void> {
    const url = this._baseUrl + "/movies/" + movieId;
    return this._http.delete<void>(url);
  }
}

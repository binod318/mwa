import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from '../movies-data.service';

class Viewer {
  rating!: String;
}
class Tomato {
  viewer!: Viewer
}

export class Movie {
  _id!:string;
  title!:string;
  year!:number;
  type!:string;
  released!: Date;
  genres!:[string];
  directors!:[string];
  tomatoes!:Tomato;
  poster!:string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies:Movie[] = [];

  constructor(private _moviesService:MoviesDataService) { }

  ngOnInit(): void {
    this._moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

}

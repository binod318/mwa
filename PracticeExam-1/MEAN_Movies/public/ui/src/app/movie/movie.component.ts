import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesDataService } from '../movies-data.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie!: Movie;

  constructor(private _movieService: MoviesDataService, private _route: ActivatedRoute, private _router: Router) { 
    this.movie = new Movie();
  }

  ngOnInit(): void {
    const movieId = this._route.snapshot.params['movieId'];
    this._movieService.getMovie(movieId).subscribe(movie => {
      this.movie = movie;
    });
  }

  delete(movieId:string){
    this._movieService.deleteMovie(movieId).subscribe(() => {
      this._router.navigate([""]);
    })
  }
}

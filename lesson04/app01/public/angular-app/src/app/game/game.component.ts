import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Game;
  constructor(private _gamesService:GamesDataService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    const gameId = this._route.snapshot.params["gameId"];
    this._gamesService.getGame(gameId).subscribe(game => {
      this.game = game;
    });
  }

}

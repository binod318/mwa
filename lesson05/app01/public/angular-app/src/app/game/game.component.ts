import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Game;
  constructor(private _gamesService:GamesDataService, private _route:ActivatedRoute, private _router:Router) { 
    this.game = new Game("","",0,0);
  }

  ngOnInit(): void {
    const gameId = this._route.snapshot.params["gameId"];
    this._gamesService.getGame(gameId).subscribe(game => {
      this.game = game;
    });
  }

  onDelete(gameId: string){
    this._gamesService.deleteGame(gameId).subscribe(game => {
      //if game delete is success then go to games page
      if(game._id){
        this._router.navigate(["games"]);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;

  get _id() { return this.#_id; }
  set _id(_id: string) { this.#_id = _id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }
  get year() { return this.#year; }
  set year(year: string) { this.#year = year; }
  get rate() { return this.#rate; }
  set rate(rate: number) { this.#rate = rate; }
  get price() { return this.#price; }
  set price(price: number) { this.#price = price; }
  get minPlayers() { return this.#minPlayers; }
  set minPlayers(minPlayers: number) { this.#minPlayers = minPlayers; }
  get maxPlayers() { return this.#maxPlayers; }
  set maxPlayers(maxPlayers: number) { this.#maxPlayers = maxPlayers; }
  get minAge() { return this.#minAge; }
  set minAge(minAge: number) { this.#minAge = minAge; }
  
  constructor(id:string, title:string, rate:number, price:number){
    this._id = id;
    this.title = title;
    this.rate = rate;
    this.price = price;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games:Game[] = [];
  constructor(private _gamesService:GamesDataService) { }

  ngOnInit(): void {
    this.callGetGames();
  }

  onDelete(gameId: string){
    this._gamesService.deleteGame(gameId).subscribe(game => {
      //if delete is success then call another service 
      if(game._id){
        //delete locally
        this.games = this.games.filter(o => o._id !== game._id);

        //refresh from db
        //this.callGetGames();
      }
    })
  }

  callGetGames(): void{
    this._gamesService.getGames().subscribe(games => {
      this.games = games;
    });
  }
}

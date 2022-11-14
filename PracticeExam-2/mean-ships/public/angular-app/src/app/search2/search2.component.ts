import { Component, OnInit } from '@angular/core';
import { Filter } from '../search/search.component';
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css']
})
export class Search2Component implements OnInit {

  ships:Ship[] = [];
  latitude!:number;
  longitude!:number;
  distance!:number;

  constructor(private _shipsService:ShipsDataService) { }

  ngOnInit(): void {
  }

  onSearch(){
    if(this.latitude && this.longitude){
      const filter = new Filter(this.latitude, this.longitude, this.distance, 0, 0);
      this._shipsService.getFilteredShips(filter).then(ships => {
        this.ships = ships;
      })
    }
  }

}

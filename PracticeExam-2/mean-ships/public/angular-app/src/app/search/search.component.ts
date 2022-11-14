import { Component, OnInit } from '@angular/core';
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

export class Filter{
  latitide!:number;
  longitude!:number;
  distance!:number;
  count!:number;
  offset!:number;

  constructor(latitude:number, longitude:number, distance:number,count:number,offset:number){
    this.latitide = latitude;
    this.longitude = longitude;
    this.distance = distance;
    this.count = count;
    this.offset = offset;
  }

  toQueryString(){
    let query = this.latitide ? 'lat='+this.latitide : '';
    query = this.longitude ? (query ? query + '&' : '') + 'lng=' + this.longitude : query;
    query = this.distance ? (query ? query + '&' : '') + 'dist=' + this.distance : query;
    query = this.count ? (query ? query + '&' : '') + "count=" + this.count : query;
    query = this.offset ? (query ? query + '&' : '') + "offset=" + this.offset : query;
    
    query = query ? '?' + query : '';
    return query;
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  latitude!:number;
  longitude!:number;
  distance!:number;

  ships: Ship[] = [];

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

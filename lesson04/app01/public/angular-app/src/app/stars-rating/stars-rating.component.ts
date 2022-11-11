import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit {
  stars: number[] = [];

  @Input()
  set rating(rating: number) {
    this.stars = new Array<number>(rating);
  }

  constructor() { }

  ngOnInit(): void {
  }
}

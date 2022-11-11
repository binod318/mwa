import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges {

  @Input()
  childX!:number;
  @Input()
  childY!:number;

  @Input()
  childA!:number;

  childZ!:number;

  @Output()
  addEvent:EventEmitter<number> = new EventEmitter<number>();

  @Output()
  multiplyEvent:EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('calling', changes['childX']);
  }

  ngOnInit(): void {
  }

  add(){
    this.childZ = this.childX + this.childY;
    this.addEvent.emit(this.childZ);
  }

  multiply(){
    this.multiplyEvent.emit(this.childY * this.childA);
  }
}

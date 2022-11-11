import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  parentX: number = 5;
  parentY: number = 3;

  parentA: number = 6;

  parentM!: number;
  parentZ!: number;
  constructor() { }

  ngOnInit(): void {
  }

  setParentZ(msg: number): void {
    this.parentZ = msg;
  }

  setParentA(msg: number): void {
    this.parentM = msg;
  }
}

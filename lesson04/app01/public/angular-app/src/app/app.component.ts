import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';
  people:string[] = ["Jack", "John", "Jill", "Jim"];
  students = [
              {name: "Jack", course: "MWA", gpa: 3.0},
              {name: "JIM", course: "MWA", gpa: 3.0},
              {name: "Jill", course: "MWA", gpa: 3.0}
            ];

  today:Date = new Date();


  onBtnClick() {
    this.title = "Button Clicked";
  }

}

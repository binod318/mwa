import { Component, OnInit } from '@angular/core';
import { InspectionDataService } from '../inspection-data.service';

class Address {
  city!:string;
  zip!:string;
}

export class Inspection {
  _id!:string;
  id!:string;
  business_name!:string;
  date!:Date;
  result!:string;
  address!:Address;
}

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {

  inspections:Inspection[] = [];

  constructor(private _inspectionsService: InspectionDataService) { }

  ngOnInit(): void {
    this._inspectionsService.getInspections().subscribe(inspections =>{
      this.inspections = inspections;
    })
  }


}

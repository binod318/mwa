import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionDataService } from '../inspection-data.service';
import { Inspection } from '../inspections/inspections.component';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  inspection!: Inspection;

  constructor(private _inspectionsService: InspectionDataService, private _route:ActivatedRoute, private _router:Router) { 
    this.inspection = new Inspection();
  }

  ngOnInit(): void {
    const inspectionId: string = this._route.snapshot.params['inspectionId'];
    this._inspectionsService.getInspection(inspectionId).subscribe(inspection => {
      this.inspection = inspection;
    })
  }

  delete(id:string){
    this._inspectionsService.deleteinspection(id).subscribe(() =>{
      this._router.navigate([""]);
    })
  }

}

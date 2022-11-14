import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionComponent } from './inspection/inspection.component';
import { InspectionsComponent } from './inspections/inspections.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionsComponent
  },
  {
    path: 'inspection/:inspectionId',
    component: InspectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

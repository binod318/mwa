import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JobComponent } from './job/job.component';
import { JobsComponent } from './jobs/jobs.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
  {
    path: 'job/:jobId',
    component:JobComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

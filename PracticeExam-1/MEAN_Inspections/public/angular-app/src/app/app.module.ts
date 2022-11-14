import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { InspectionComponent } from './inspection/inspection.component';

@NgModule({
  declarations: [
    AppComponent,
    InspectionsComponent,
    InspectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

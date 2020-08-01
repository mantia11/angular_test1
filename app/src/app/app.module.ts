import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AgmCoreModule } from '@agm/core';
import { PagesListComponent } from './pages-list/pages-list.component';
import { MapComponent } from './map/map.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

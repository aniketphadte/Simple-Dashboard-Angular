import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from'@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { StatsComponent } from './location-selector/stats/stats.component';
import { MapsComponent } from './location-selector/maps/maps.component';

import { WeatherService } from './02-services/weather.service';
import { RegionService } from './02-services/region.service';
import { RouteGuard } from './03-gaurds/route.guard';
// import { HeaderComponent } from './header/header.component';
import { DefaultDashboardComponent } from './location-selector/default-dashboard/default-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationSelectorComponent,
    StatsComponent,
    MapsComponent,
    // HeaderComponent,
    DefaultDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RegionService, WeatherService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

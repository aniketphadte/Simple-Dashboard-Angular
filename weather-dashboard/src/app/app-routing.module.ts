import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { DefaultDashboardComponent } from './location-selector/default-dashboard/default-dashboard.component';
import { StatsComponent } from './location-selector/stats/stats.component';
import { MapsComponent } from './location-selector/maps/maps.component';
import { RouteGuard } from "./03-gaurds/route.guard";

const routes: Routes = [
  {
    path:'',
    component:LocationSelectorComponent,
    children: [
      {
         path:'',
         component:DefaultDashboardComponent
      },
      {
         path:'stats/:countryCode/:city',
         component: StatsComponent,
         canActivate: [RouteGuard]
      },
      {
          path:'maps/:countryCode/:city',
          component: MapsComponent,
          canActivate:[RouteGuard]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegionService } from '../02-services/region.service';

@Injectable()
export class RouteGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  constructor(private _region: RegionService, private _router: Router){}
  canActivate():boolean {
    if(this._region.isFirstCallDone()){
      return true;
    } else{
      this._router.navigate(['/'])
      return true;
    }
  }

}

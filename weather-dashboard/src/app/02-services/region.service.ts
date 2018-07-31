import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ICountries} from '../01-interface/countries';

@Injectable()
export class RegionService {

  firstCall: boolean = false;

  constructor(private _http: HttpClient) { }

  getCountries(region: string){
    this.firstCall=true;
    return this._http.get<ICountries[]>(
      "https://restcountries.eu/rest/v2/region/"+ region
    ).map(result =>result);
  }

  isFirstCallDone(){
    return this.firstCall;
  }

}

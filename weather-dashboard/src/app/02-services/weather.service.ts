import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WeatherService {

  firstCall: boolean = false;

  constructor(private _http: HttpClient) { }

  dailyForecast(city: string, countryCode: string){
    this.firstCall=true;
    return this._http.get(
      "http://api.openweathermap.org/data/2.5/forecast?q="+city+","+countryCode+"&appid=b6907d289e10d714a6e88b30761fae22"
    ).map(result =>result).catch(this.errorHandler);
  }

  dailyWeather(city: string, countryCode: string){
    this.firstCall=true;
    return this._http.get(
      "http://api.openweathermap.org/data/2.5/weather?q="+city+","+countryCode+"&appid=b6907d289e10d714a6e88b30761fae22"
    ).map(result =>result).catch(this.errorHandler);
  }

  isFirstCallDone(){
    console.log(this.firstCall);
    return this.firstCall;
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server error");
  }

}

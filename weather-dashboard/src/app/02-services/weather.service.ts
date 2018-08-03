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
      "http://api.openweathermap.org/data/2.5/forecast?q="+city+","+countryCode+"&appid=7e0d625e25d6dff6dedd0f893b02ced2"
    ).map(result =>result).catch(this.errorHandler);
  }

  dailyWeather(city: string, countryCode: string){
    this.firstCall=true;
    return this._http.get(
      "http://api.openweathermap.org/data/2.5/weather?q="+city+","+countryCode+"&appid=7e0d625e25d6dff6dedd0f893b02ced2"
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

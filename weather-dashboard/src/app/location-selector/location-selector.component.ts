import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegionService } from '../02-services/region.service';
import { ICountries } from '../01-interface/countries';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {

  regions =['Asia', 'Europe', 'Africa','Americas'];
  regionSelected: string;
  alpha2Code : string;
  city: string;
  inputCity: string;
  hasCityValue: boolean = false;
  activateWeatherChart: boolean = false;
  countries :ICountries[] =[];
  route:string;

  constructor(private _region: RegionService, private  _router : Router) { 
  }

  ngOnInit() {
  }

  onRegionSelected(val: string){
    this.regionSelected = val;
    this.countries = [];
    this._region.getCountries(this.regionSelected).subscribe(
      res => {
        res.forEach((result)=>{
          this.countries.push(result);
        });
      }
    );
  }


  // onCountrySelected(alpha2Code : string){
  //   this.alpha2Code= alpha2Code;
  //   console.log(this.alpha2Code);
  // }
  checkInput(){
    if(this.city.length >0)
     {
       this.hasCityValue = true;
     }
     else{
      this.hasCityValue = false;
     }
   }
  submitWeatherCity(){
      this.activateWeatherChart = true;
      this.inputCity =this.city;
      if(this._router.url.split('/')[1]== 'maps')
      {
        this._router.navigateByUrl('/maps/'+this.alpha2Code+'/'+this.city);
      }
      else{
        this._router.navigateByUrl('/stats/'+this.alpha2Code+'/'+this.city);
      }
  }


}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private _region: RegionService, private  _router : Router, private _route:  ActivatedRoute) { 
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


  submitWeatherCity(){
      this.activateWeatherChart = true;
      this.inputCity =this.city;
      if(this._router.url.split('/')[1]== 'maps')
      {
        // this._router.navigateByUrl('/maps/'+this.alpha2Code+'/'+this.city);
        this._router.navigate(['maps',this.alpha2Code,this.city],{relativeTo: this._route});
      }
      else{
        // this._router.navigateByUrl('/stats/'+this.alpha2Code+'/'+this.city);
        this._router.navigate(['stats',this.alpha2Code,this.city], {relativeTo: this._route});
      }
  }


}

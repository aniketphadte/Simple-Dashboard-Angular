import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../02-services/weather.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  constructor(private _weather: WeatherService) { }

  ngOnInit() {
  }

}

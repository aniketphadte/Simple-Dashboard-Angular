import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../02-services/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  chart =[];
  pieChart =[];
  countryCode: string;
  city: string;
  errorMsg: string;

  constructor(private _weather: WeatherService, private _route: ActivatedRoute) { 
  }

  ngOnInit() {
    
    this._route.paramMap.subscribe(params =>{
      this.countryCode = params.get('countryCode');
      this.city = params.get('city');
      console.log("Init Function "+ this.countryCode +" "+this.city);
      this.getLineChart();
      this.getPieChart();
    });
    
  }

  getLineChart(){
    this._weather.dailyForecast(this.city,this.countryCode).subscribe(
      res => {
        this.errorMsg="";
        let temp_max = res['list'].map(res=> res.main.temp_max);
        let temp_min = res['list'].map(res=> res.main.temp_min);
        let alldates = res['list'].map(res=> res.dt);

        let weatherDates = [];
        alldates.forEach((res)=>{
          let jsdate = new Date(res*1000)
          weatherDates.push(jsdate.toLocaleTimeString('en',{year: 'numeric', month:'short', day: 'numeric'}))
        });

        this.chart = new Chart('linechart-canvas', {
          type: 'line',
          data:{
            labels: weatherDates,
            datasets:[
              {
              data: temp_max,
              borderColor: '#3cba9f',
              fill:false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill:false
                }
            ]
          },
          options:{
            legend:{
              display:false
            },
            scales:{
              xAxes: [{
                display: true
              }],
              yAxes:[{
                display: true
              }]
            }
          }
        });
      },
      error =>  this.errorMsg = "Invalid City"
    );
  }

  getPieChart(){
    this._weather.dailyWeather(this.city,this.countryCode).subscribe(
      res => {
        this.errorMsg="";
        let temp = res['main'].temp;
        let pressure = res['main'].pressure;
        let humidity = res['main'].humidity;

        this.pieChart = new Chart('piechart-canvas', {
          type: 'pie',
          data:{
            labels: ['temperature','pressure','humidity'],
            datasets:[
              {
              data: [temp, pressure, humidity],
              backgroundColor : ['#f1c40f', '#e67e22','#16a085'], //#2980b9, #8e44ad
              label : 'Value'
              }
            ]
          },
          options:{
            cutoutPercentage: 50,
            animation: {
              animateScale: true
            }
          }
        });



      },
      error =>  this.errorMsg = "Invalid City"
    )

  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  //function to handle the forecasts of the introduced days
  getForecast(event) {
    var cityName = event.event.extendedProps.city;
    var country = 'CO';

    //we receive the events that are currently introduced, we need their cities and
    return this.http.get(this.apiUrl+cityName+','+country+'&appid='+this.apiKey);
  }

}

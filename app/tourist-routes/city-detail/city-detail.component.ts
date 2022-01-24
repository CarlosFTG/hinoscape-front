import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
})
export class CityDetailComponent implements OnInit {

  cityName:object;

  constructor(private citiesService: CitiesService) { }

  ngOnInit() {
    this.citiesService.city$.subscribe(city => {

      if(city != null){
        this.cityName=city;
        console.log(this.cityName)
      }
      
    });
  }

}

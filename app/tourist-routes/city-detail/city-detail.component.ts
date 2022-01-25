import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CitiesService } from '../services/cities.service';
import { RoutesService } from '../services/routes.service';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
})
export class CityDetailComponent implements OnInit {

  city: object;
  routes = new Array;
  page = 0;
  maximumPages = 3;
  creationActive:Boolean=false;
  routePointsList = [];
  routeInfo: FormGroup;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(private citiesService: CitiesService, private navCtrl: NavController, private routesService:RoutesService,private fb: FormBuilder) { }

  ngOnInit() {
    this.citiesService.city$.subscribe(city => {

      if (city != null) {
        this.city = city;
        //@ts-ignore  
        if (this.city.routesList != undefined) {
          //@ts-ignore  
          for (let i = 0; i < this.city.routesList.length; i++) {
            //@ts-ignore  
            this.routes.push(this.city.routesList[i]);
          }
        }

      }

    });

    this.routesService.point$.subscribe(point=>{
      if(point != null){
        this.routePointsList.push(point);
      }
    });

    this.routeInfo = this.fb.group({
      name: [''],
      observations: [''],
      //@ts-ignore
      city:[this.city.id],
      routePoints:[this.routePointsList]
    });
  }

  createRoute(){
    this.creationActive=true;
    this.routesService.sendCreateRoute(true);
  }

  saveRoute(){
    /* let route = {
      'name':null,
      'observations':null,
      'routePoints':this.routePointsList,
      //@ts-ignore
      'city':this.city.id
    } */
    this.routesService.saveRoute(this.routeInfo.value).subscribe(
      res=>{
        this.routes.push(res);
      }
    )
  }

}

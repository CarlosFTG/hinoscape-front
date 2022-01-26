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
  routePointsList = new Array;;
  routeInfo: FormGroup;
  creationError: Boolean=false;
  errorText:String;
  routeSelected:Boolean=false;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(private citiesService: CitiesService, private navCtrl: NavController, private routesService:RoutesService,private fb: FormBuilder) { }

  ngOnInit() {
    this.routePointsList = new Array;
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

  //método para iniciar la creación de rutas. Envía true para que en mapa permita abrir modal al obtener coordenadas
  createRoute(){
    this.clearForm();
    this.routePointsList = new Array();
    this.creationActive=true;
    this.routesService.sendCreateRoute(true);
  }

  saveRoute(){
    //@ts-ignore
    this.routeInfo.get('city').setValue(this.city.id);
    this.routeInfo.get('routePoints').setValue(this.routePointsList);
    console.log(this.routeInfo.value)
    if(this.routePointsList.length > 0 && this.routeInfo.get('name').value != ""){
      this.routesService.saveRoute(this.routeInfo.value).subscribe(
        res=>{
          //TODO: Control de errores del back
          /* if(res.errorMsg.length > 0){
            this.creationError=true;
            this.errorText="Se ha producido un error al registrar la ruta"
          }else{ */
            this.routePointsList = new Array();
            this.routes.push(res);
            this.routeInfo.reset();
            this.creationActive=false;
            this.clearForm();

          //}
          
        }
      )
    }else{
      this.creationError=true;
      this.errorText="Debe seleccionar al menos un punto y/o informar el nombre de la ruta"
    }
  }

  whatchDetail(route){
    this.creationActive=false;
    this.routesService.sendCreateRoute(false);
    this.routeInfo.get('name').setValue(route.name);
    this.routeInfo.get('observations').setValue(route.observations);
    this.routeSelected=true;
    this.routePointsList = new Array;
    route.routePoints.forEach(routePoint => {
      this.routePointsList.push(routePoint)
    });
  }
  clearForm(){
    this.routeInfo = this.fb.group({
      name: [''],
      observations: [''],
      city:[''],
      routePoints:['']
    });
  }
}


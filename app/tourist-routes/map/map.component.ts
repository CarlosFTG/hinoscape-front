import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { MapService } from '../services/map.service';

import { ModalController } from '@ionic/angular';
import { CreateRouteModalComponent } from '../create-route-modal/create-route-modal.component';
import { RoutesService } from '../services/routes.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  centerMapCoords: string;
  map;
  createRoute:Boolean;

  constructor(private citiesService: CitiesService, private mapService: MapService,public modalController: ModalController,private routesService: RoutesService) { }

  ngOnInit() {
    this.createRoute=false;
    this.citiesService.cityCoords$.subscribe(cityCoords => {
      if(cityCoords != null){
        this.centerMapCoords=cityCoords;
      }

    });

    this.routesService.createRoute$.subscribe(createRoute => {
      if(createRoute!=null){
        this.createRoute=createRoute;
      }
    })
    this.mapService.renderMap(this.centerMapCoords);
  }

  async openCreateRouteModal(event){
    if(this.createRoute){
      let coords=this.mapService.getCoordsOnClick(event);
      const modal = await this.modalController.create({
        component: CreateRouteModalComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          'coords': coords,
        }
      });
      return await modal.present();
    }
    
  }
 

}

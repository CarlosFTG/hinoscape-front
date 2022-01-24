import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { MapService } from '../services/map.service';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  centerMapCoords: string;
  map;


  constructor(private citiesService: CitiesService, private mapService: MapService) { }

  ngOnInit() {
    this.citiesService.cityCoords$.subscribe(cityCoords => {
      if(cityCoords != null){
        this.centerMapCoords=cityCoords;
      }

    });
    this.mapService.renderMap(this.centerMapCoords);
  }

}

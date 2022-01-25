import { Injectable } from '@angular/core';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//OpenLayers
import { Map } from 'ol';
import { defaults as defaultInteractions } from 'ol/interaction';
import WKT from 'ol/format/WKT';
//import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile.js';
import { BingMaps } from 'ol/source';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import { RoutesService } from './routes.service';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;
  layers = [];
  view;
  format = new WKT();
  viewCoordinates: String = 'POINT(-3.703606430985161 40.41666320878426)';


  constructor() { }

  get map$() {
    return this.map;
  }

  renderMap(cityCoords) {
    this.layers = [
      new TileLayer({
        name: 'base',
        source: new BingMaps({
          key: 'AlqHetBTtIFed0g61VUmEq079AmyyXfR9FPcqzBt13dvYZsuowl7ZTMFtWJik0LL',
          imagerySet: ['CanvasDark']
        })
      })
    ];

    this.view = new View({
      center: this.format.readFeature(cityCoords, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates(),
      zoom: 17,
      maxZoom: 20,
    });

    let interactions = defaultInteractions({ altShiftDragRotate: false, pinchRotate: false });

    this.map = new Map({
      layers: this.layers,
      target: document.getElementById('map'),
      controls: [],
      view: this.view,
      interactions: interactions

    });
  }

  getCoordsOnClick(event:any){
    let coords =this.map.getEventCoordinate(event)
    var lonlat = olProj.transform([coords[0],coords[1]], 'EPSG:3857', 'EPSG:4326');
    let coordsString = "POINT("+lonlat[0]+ " "+lonlat[1]+")"
    return coordsString;
  }
}

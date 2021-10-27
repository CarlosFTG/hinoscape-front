import { Injectable } from '@angular/core';

import {StyleUserFeatureService} from '../services/style-user-feature.service'

//OpenLayers
import { Map } from 'ol';
import { defaults as defaultInteractions } from 'ol/interaction';
import WKT from 'ol/format/WKT';
//import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile.js';
import { BingMaps } from 'ol/source';
import Select from 'ol/interaction/Select';
import { OSM } from 'ol/source';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import View from 'ol/View';
import { Style, Icon as IconStyle, Text, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import Collection from 'ol/Collection';
import Point from 'ol/geom/Point';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameboardServicesService {

   map;
  layers = [];
  viewCoordinates: String = 'POINT(-3.703606430985161 40.41666320878426)';
  view;
  format = new WKT();
  initialCoords: String ;
  userPosition = new Collection;
  challengesPosition = new Collection;

  constructor(private styleUserFeatureService:StyleUserFeatureService,private httpClient:HttpClient) { }

  get map$() {
    return this.map;
  } 

  renderMap() {
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
      center: this.format.readFeature(this.viewCoordinates, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates(),
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

  createUserPoint(){
    this.userPosition = new Collection;

    let initialCoords=JSON.parse(localStorage.getItem('userCoords'));

    let formatCoords= 'POINT('+initialCoords.lng+ ' '+ initialCoords.lat+" 216.7"+')';

    let userCoords = this.format.readFeature(formatCoords.replace(
      /[\W]*\S+[\W]*$/, '') + ')', { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates();

      let userFeature = new Feature({
        geometry: new Point(userCoords)
      });

      this.styleUserFeatureService.applyStyle(userFeature);

      this.userPosition.push(userFeature);

      let userLayer = new VectorLayer({
        name: 'userPosition',
        source: new VectorSource({
          features: this.userPosition
        })
      })
      this.map$.addLayer(userLayer);
  }

  createChallenges(res){
    res.forEach(it => {
      let challengeObj={lat:null,lng:null}
      let coordsSplit = it.coordinates.coordinates.split(" ");
      challengeObj.lng=coordsSplit[0];
      challengeObj.lat=coordsSplit[1];
      let formatCoords= 'POINT('+challengeObj.lng+ ' '+ challengeObj.lat+" 216.7"+')';
      let challengeCoords = this.format.readFeature(formatCoords.replace(
        /[\W]*\S+[\W]*$/, '') + ')', { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates();
        let challengeFeature = new Feature({
          geometry: new Point(challengeCoords)
        });

        this.styleUserFeatureService.applyStyle(challengeFeature);

        this.challengesPosition.push(challengeFeature);

    })
    let challengesLayer = new VectorLayer({
      name: 'challenges',
      source: new VectorSource({
        features: this.challengesPosition
      })
    })
    console.log(challengesLayer)
    this.map$.addLayer(challengesLayer);
  }

  async getUserPosition() {
    let coords = await this.fetchCoordinates();
    let zoomCenter =17;

    if (coords !== undefined) {
      //@ts-ignore
      //this.getGeoCoding(coords.coords);

      let userCoords = {
        //@ts-ignore
        lat: coords.coords.latitude,
        //@ts-ignore
        lng: coords.coords.longitude
      }
      
      this.initialCoords='POINT('+userCoords.lng+ ' '+userCoords.lat+')';
      this.view = new View({
        center: this.format.readFeature(this.initialCoords, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates(),
        zoom: zoomCenter,
        maxZoom: 20,
      });
      
      this.map.setView(this.view);
      localStorage.setItem('userCoords', JSON.stringify(userCoords));
      this.createUserPoint();
    }
  }

  getCoordinates() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async fetchCoordinates() {
    const position = await this.getCoordinates()
      .catch(err => console.log(err));

      return position;
  }

  getUserChallenges(userId){
    return this.httpClient.get(
      'http://localhost:8081/getUserChallenges'
       , {
         params: {
           'userId': userId
         }
       }
     ).pipe(catchError((error: any) => Observable.throw(error)))
  }
}

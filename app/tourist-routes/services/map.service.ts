import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
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
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Collection from 'ol/Collection';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import { PointsStyleService } from './points-style.service';
import { LinesStyleService } from './lines-style.service';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;
  layers = [];
  view;
  format = new WKT();
  viewCoordinates: String = 'POINT(-3.703606430985161 40.41666320878426)';
  newRoutePointsCollection = new Collection;
  loadedRoutesPointsCollection = new Collection;
  loadedRoutes = [];

  constructor(private pointsStyleService: PointsStyleService, private linesStyleService: LinesStyleService) { }

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
    this.createRoutesLineString();
  }

  getCoordsOnClick(event: any) {
    let coords = this.map.getEventCoordinate(event)
    var lonlat = olProj.transform([coords[0], coords[1]], 'EPSG:3857', 'EPSG:4326');
    this.routeCreationPoints(lonlat[1], lonlat[0]);
    let coordsString = "POINT(" + lonlat[0] + " " + lonlat[1] + ")"
    return coordsString;
  }

  routeCreationPoints(lon, lat) {
    let formatCoords = 'POINT(' + lat + ' ' + lon + " 216.7" + ')';

    let coords = this.format.readFeature(formatCoords.replace(
      /[\W]*\S+[\W]*$/, '') + ')', { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates();
    let newRoutePointFeature = new Feature({
      geometry: new Point(coords)
    });

    this.pointsStyleService.applyStyleToMarker(newRoutePointFeature);

    this.newRoutePointsCollection.push(newRoutePointFeature);

    let newRoutePointsLayer = new VectorLayer({
      name: 'newRoutePointsLayer',
      source: new VectorSource({
        features: this.newRoutePointsCollection
      })
    })
    this.map$.addLayer(newRoutePointsLayer);
  }

  //se dibujan las rutas existentes al ver el detalle de una ciudad
  createRoutesLineString() {
    let coordsArray = new Array;
    
    this.loadedRoutes.forEach(route => {
      coordsArray = new Array;
      let newRouteLineStringFeature 
      route.routePoints.forEach(point => {
        let coords = this.format.readFeature(this.formatPoint(point.coordinates).replace(
          /[\W]*\S+[\W]*$/, '') + ')', { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).getGeometry().getCoordinates();
        coordsArray.push(coords);

        newRouteLineStringFeature = new Feature({
          geometry: new LineString(coordsArray)
        });

        
      });
      this.linesStyleService.applyStyleToLine(newRouteLineStringFeature);
  
        this.loadedRoutesPointsCollection.push(newRouteLineStringFeature);
      let loadedRoutesPointsLayer = new VectorLayer({
        name: 'loadedRoutesPointsLayer',
        source: new VectorSource({
          features: this.loadedRoutesPointsCollection
        })
      })
      this.map$.addLayer(loadedRoutesPointsLayer);
    });
    
  }

  formatPoint(coords) {
    let coordsSplit = coords.split(' ');
    let coordsSplit2 = coordsSplit[2].replace(')', ' ');
    let stringFormatted = coordsSplit[0] + coordsSplit[1] + " " + coordsSplit2 + "216.7)";

    return stringFormatted;
  }
}

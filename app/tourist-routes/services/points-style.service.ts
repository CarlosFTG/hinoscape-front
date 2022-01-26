import { Injectable } from '@angular/core';
import { Style, Icon as IconStyle, Text, Fill, Stroke, Circle as CircleStyle } from 'ol/style';


@Injectable({
  providedIn: 'root'
})
export class PointsStyleService {

  assets_base = 'assets/img/';


  constructor() { }

  applyStyleToMarker(newRoutePointFeature){

    let markerStyle = [];
      markerStyle.push(
        new Style({
        image: new IconStyle({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          opacity: 1,
          src: this.assets_base + 'vehicle_pin.png',
          snapToPixel: false
        }),
        //Text Style
        text: new Text({
          textAlign: 'center',
          font: '9px',
          textBaseline: 'top',
          //text: vehicleInfo.name,
          scale: 1.5,
          offsetX: 0,
          offsetY: 4,
          // fill: new Fill({
          //   color: textoVehiculo_color
          // })
          // ,
          stroke: new Stroke({
            width: 0
          })
        })
      })
      );
      markerStyle.push()
      newRoutePointFeature.setStyle(markerStyle);

    }
}

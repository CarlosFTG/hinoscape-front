import { Injectable } from '@angular/core';

import { Style, Icon as IconStyle, Text, Fill, Stroke, Circle as CircleStyle } from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class StyleUserFeatureService {

  assets_base = 'assets/img/';

  constructor() { }

  applyStyle(userFeature) {
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
      }),
      new Style({
        image: new IconStyle(({
          anchor: [16, 70],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          opacity: 1,
          src: 'assets/img/iconmonstr-user-6-32.png',
          snapToPixel: false
        }))
      })
    );
    userFeature.setStyle(markerStyle);
  }


}

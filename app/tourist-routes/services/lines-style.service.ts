import { Injectable } from '@angular/core';
import { Style, Icon as IconStyle, Text, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import { ColorsEnum } from '../../utils/enums/colorsEnum';

@Injectable({
  providedIn: 'root'
})
export class LinesStyleService {

  private colors=ColorsEnum;
  line=0;
  constructor() { }

  applyStyleToLine(lineFeature){
    this.line++;
    let lineStyle = [];
    lineStyle.push(
      new Style({
        stroke: new Stroke({
          color:this.setColor()
        }),

      })
    );
    lineFeature.setStyle(lineStyle);
  }

  setColor(){
    if(this.line == 1){
      return this.colors.red
    }else if(this.line ==2){
      return this.colors.blue;
    }
  }
}

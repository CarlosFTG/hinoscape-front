import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { GameboardComponent } from './gameboard.component';



@NgModule({
  declarations: [MapComponent,GameboardComponent],
  imports: [
    CommonModule
  ]
})
export class GameboardModule { }

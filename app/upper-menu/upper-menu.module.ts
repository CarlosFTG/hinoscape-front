import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{UpperMenuComponent}from '../upper-menu/upper-menu/upper-menu.component';
import { ScoreBoardComponent } from './score-board/score-board.component';

@NgModule({
  declarations: [UpperMenuComponent, ScoreBoardComponent],
  imports: [
    CommonModule
  ],
  exports:[
    UpperMenuComponent
  ]
})
export class UpperMenuModule { }

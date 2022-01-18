import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{UpperMenuComponent}from '../upper-menu/upper-menu/upper-menu.component';
import { MenuComponent } from './menu/menu.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [UpperMenuComponent, MenuComponent],
  imports: [
    CommonModule,IonicModule,BrowserModule
  ],
  exports:[
    UpperMenuComponent
  ],
  providers:[]
})
export class UpperMenuModule { }

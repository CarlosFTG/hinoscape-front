import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UpperMenuModule } from '../upper-menu/upper-menu.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TouristRoutesModule } from '../tourist-routes/tourist-routes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    UpperMenuModule,
    TouristRoutesModule
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

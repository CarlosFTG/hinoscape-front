import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesComponent } from './cities/cities.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { MapComponent } from './map/map.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { CreateRouteModalComponent } from './create-route-modal/create-route-modal.component';

@NgModule({
  declarations: [UsersComponent,CitiesComponent,CreateCityComponent, MapComponent,CityDetailComponent,CreateRouteModalComponent],
  imports: [
    BrowserModule ,CommonModule, IonicModule,Ng2SearchPipeModule,FormsModule,ReactiveFormsModule
  ],
  exports:[MapComponent]
})
export class TouristRoutesModule { }

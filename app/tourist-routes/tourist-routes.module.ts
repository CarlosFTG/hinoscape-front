import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesComponent } from './cities/cities.component';
import { CreateCityComponent } from './create-city/create-city.component';


@NgModule({
  declarations: [UsersComponent,CitiesComponent,CreateCityComponent],
  imports: [
    BrowserModule ,CommonModule, IonicModule,Ng2SearchPipeModule,FormsModule,ReactiveFormsModule
  ],
  
})
export class TouristRoutesModule { }

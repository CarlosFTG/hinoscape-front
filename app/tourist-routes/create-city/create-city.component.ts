import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { CitiesService } from '../services/cities.service';

import { ModalController } from '@ionic/angular';
import { GenericModalComponent } from '../../utils/generic-modal/generic-modal.component';


@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss'],
})
export class CreateCityComponent implements OnInit {


  submitted = false;
  cityDetails: FormGroup;


  constructor(private fb: FormBuilder, private  citiesService: CitiesService,public modalController: ModalController) { }

  ngOnInit() {
    this.cityDetails = this.fb.group({
      name: [''],
    });
  }

  createCity(){
    this.submitted = true;
    
    this.citiesService.createCity(this.cityDetails.value).subscribe(
      res => {
        this.citiesService.sendCity(res);
        this.citiesService.sendCityCoords(res.coordinates);
        this.citiesService.sendCity(res.name);
        console.log(res)
        this.openGenericModal();
      }, 
      err => {
        console.log(err)
      }
    );
  }

  async openGenericModal(){
    const modal = await this.modalController.create({
      component: GenericModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'params':{
          'text':"¿Desea añadir rutas a esta ciudat?",
          'action:':1,
          'param1': this.cityDetails.value
        }
      }
    });
    return await modal.present();
  }

}

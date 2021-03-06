import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoutesService } from '../services/routes.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-create-route-modal',
  templateUrl: './create-route-modal.component.html',
  styleUrls: ['./create-route-modal.component.scss'],
})
export class CreateRouteModalComponent implements OnInit {
  @Input() coords: object;
  stopInfo: FormGroup;
  creationError: Boolean=false;
  errorText:String
  
  constructor(private fb: FormBuilder, private routeService: RoutesService,private modalController: ModalController) { }

  ngOnInit() {
    this.stopInfo = this.fb.group({
      name: [''],
      observations: [''],
      coordinates:[this.coords]
    });
  }

  savePoint(){
    if(this.stopInfo.get('name').value != ""){
      this.routeService.sendPoint(this.stopInfo.value);
      this.modalController.dismiss();
    }else{
      this.creationError=true;
      this.errorText="Debe informar el nombre del punto"
    }
    
  }

  saveRoute(){
    this.routeService.saveRoute(this.stopInfo.value).subscribe(
      res=>{
        console.log(res)
      }
    );
  }

}

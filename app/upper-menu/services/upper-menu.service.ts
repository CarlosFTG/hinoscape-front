import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameboardServicesService } from '../../gameboard/services/gameboard-services.service';

@Injectable({
  providedIn: 'root'
})
export class UpperMenuService {

  constructor(private gameboardServicesService:GameboardServicesService,private httpClient:HttpClient) { }

  async getDistanceToChallenge(){
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
        let coords
          resolve(
            coords.lng=resp.coords
            //coords ={lng: resp.coords.longitude, lat: resp.coords.latitude}
            //this.httpClient.post('',coords)
            //{lng: resp.coords.longitude, lat: resp.coords.latitude}
            );
        },
        err => {
          reject(err);
        });
    });
  }

  

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { CitiesService } from '../services/cities.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {

  cities: any[] = null;
  admin:boolean = false;
  citySelected:boolean = false;
  createCitySelected:boolean = false;


  constructor(private citiesService: CitiesService, private authService: AuthService) { }

  ngOnInit() {
    this.getCities();
    this.authService.token$.subscribe(token => {
      if(token != null){
        let atobToken = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin(atobToken);
      }
      
    });

    this.citiesService.city$.subscribe(city => {
      if(city != null){
        this.cities.push(city);
      }
      
    });
  }

  getCities(){
    this.citiesService.getCities().subscribe(
      data=>{
       this.cities=data;
       console.log(this.cities)    
      }
    )
   }

   clickItem(){
    
  }

  isAdmin(token){
    if(token.authorities.includes('ROLE_ADMIN')){
      this.admin=true;
    }
  }

  createCity(){
    this.createCitySelected=true;
  }

}

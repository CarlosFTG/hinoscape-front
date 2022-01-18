import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss'],
})
export class CreateCityComponent implements OnInit {


  submitted = false;
  cityDetails: FormGroup;


  constructor(private fb: FormBuilder, private  citiesService: CitiesService) { }

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
        console.log(res)
      }, 
      err => {
        console.log(err)
      }
    );
  }

}

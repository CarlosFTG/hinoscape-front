import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private city = new BehaviorSubject<Object>(null);
  city$ = this.city.asObservable();

  private cityCoords = new BehaviorSubject<string>(null);
  cityCoords$ = this.cityCoords.asObservable();

  constructor(private httpClient:HttpClient) { }

  getCities() : Observable<any>{
    return this.httpClient.get(
      'http://localhost:8081/api/cities/findAll'
       , 
       /* {
         params: {
           'start-date-local': newDateRange.fromDate,
           'end-date-local': newDateRange.toDate,
           last: last
         }
       } */
     ).pipe(catchError((error: any) => Observable.throw(error)))
  }

  createCity(cityParams): Observable<any>{
    return this.httpClient.post('http://localhost:8081/api/cities/create',cityParams);
  }

  sendCity(city){
    this.city.next(city);
  }

  sendCityCoords(cityCoords){
    this.cityCoords.next(cityCoords);
  }
}

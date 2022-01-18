import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class TouristRoutesService {

  constructor(private httpClient:HttpClient) { }

  getUsers() : Observable<any>{
    return this.httpClient.get(
      'http://localhost:8081/getUserDetails'
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
}

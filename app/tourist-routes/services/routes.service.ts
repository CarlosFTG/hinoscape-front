import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private point = new BehaviorSubject<object>(null);
  point$ = this.point.asObservable();

  private createRoute = new BehaviorSubject<Boolean>(null);
  createRoute$ = this.createRoute.asObservable();

  constructor(private httpClient: HttpClient) { }

  saveRoute(stopInfo) : Observable<any>{
    return this.httpClient.post('http://localhost:8081/api/routes/create',stopInfo);
  }

  sendPoint(point: object){
    this.point.next(point);
  }

  sendCreateRoute(createRoute: Boolean){
    this.createRoute.next(createRoute);
  }
}

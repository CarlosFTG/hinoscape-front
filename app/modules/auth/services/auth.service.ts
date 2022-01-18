import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from "../../../../environments/environment";

import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  private token = new BehaviorSubject<String>(null);
  token$ = this.token.asObservable();
  private userDetails = new BehaviorSubject<Object>(null);
  userDetails$ = this.userDetails.asObservable();

  private REST_API_SERVER = environment;
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  login(loginParams) : Observable<any>{
    return this.httpClient.post('http://localhost:8081/api/login',loginParams);
  }

  sendToken(token: String){
    this.token.next(token);
  }

  isLoggedIn() {
    let expired = this.jwtHelper.isTokenExpired(this.getJwtToken());

    if (!expired) {
      return !!this.getJwtToken();
    }

  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  registerAdmin(user) : Observable<any> {
      return this.httpClient.post('http://localhost:8081/createUserAdmin', user).pipe(catchError(this.handleError));
    
  }

  registerUser(user) : Observable<any>{
      return this.httpClient.post('http://localhost:8081/createUser', user);
    
  }

  getUserDetails(token){
    
    let tokenJSON=JSON.parse(token);
    let userName=tokenJSON.sub;
     return this.httpClient.post('http://localhost:8081/getUserDetails', userName).subscribe(
        res => {
          this.sendUserDetails(res);
        }, 
        err => {
  
        }
      ); 
  }

  sendUserDetails(userDetails: Object){
    this.userDetails.next(userDetails);
  }
  
}

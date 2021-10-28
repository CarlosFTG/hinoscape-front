import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './modules/auth/token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';


import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { MainComponent } from './components/main/main.component';
import {UpperMenuModule} from '../app/upper-menu/upper-menu.module';
import { WelcomeModule } from './welcome/welcome.module';
import { AdminboardModule } from './adminboard/adminboard.module';
import { HomePageModule } from './home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { GameboardModule } from './gameboard/gameboard.module';
import { ChallengePresentationModule } from './modules/challenge-presentation/challenge-presentation.module';
export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getAsyncToken();
    },
    allowedDomains: ["example.com"]
  }
}

@NgModule({
  declarations: [AppComponent, MainComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,UpperMenuModule, 
    WelcomeModule,AdminboardModule,HomePageModule, AuthModule,GameboardModule, ChallengePresentationModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}

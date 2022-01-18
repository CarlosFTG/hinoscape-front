import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './components/register/register.component';
export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getAsyncToken();
    },
    allowedDomains: ["example.com"]
  }
}

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    ReactiveFormsModule,IonicModule 
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
],
exports:[LoginComponent]

})
export class AuthModule { }

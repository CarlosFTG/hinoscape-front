import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/auth.guard';
import { CitiesComponent } from '../tourist-routes/cities/cities.component';
import { IntroComponent } from '../tourist-routes/intro/intro.component';
import { UsersComponent } from '../tourist-routes/users/users.component';
import { RegisteredComponent } from '../welcome/registered/registered.component';
import { WelcomeComponent } from '../welcome/welcome/welcome.component';
import { MapComponent } from '../tourist-routes/map/map.component';

import { HomePage } from './home.page';
import { CityDetailComponent } from '../tourist-routes/city-detail/city-detail.component';

const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent,
  },
   {path:'home', component:HomePage,
  children: [
    {
      path: 'registered', component: RegisteredComponent,
    },
    {
      path: 'intro', component: IntroComponent,canActivate: [AuthGuard]
    },
    {
      path: 'usersDetail', component: UsersComponent,canActivate: [AuthGuard]
    },
    {
      path: 'cities', component: CitiesComponent,canActivate: [AuthGuard],
      children:[
        {
          path: 'cityDetail', component: CityDetailComponent,canActivate: [AuthGuard]
        } 
      ]
    },{
      path: 'map', component: MapComponent
    },
    {
      path: 'cityDetail', component: CityDetailComponent,canActivate: [AuthGuard],
      children:[
        {
          path: 'map', component: MapComponent
        }
      ]
    } 
  ]}, 
  { path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
    } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

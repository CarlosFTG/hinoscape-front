import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from '../adminboard/admin-board/admin-board.component';
import { GameboardComponent } from '../gameboard/gameboard.component';
import { AuthGuard } from '../modules/auth/auth.guard';
import { WelcomeComponent } from '../welcome/welcome/welcome.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent,
  },
  /* {path:'home', component:HomePage,
  children: [
    {
      path: 'welcome', component: WelcomeComponent,
    },
    { path: 'gameboard', component: GameboardComponent,canActivate: [AuthGuard] },
    { path: 'adminBoard', component: AdminBoardComponent,canActivate: [AuthGuard] }
  ]}, */
  { path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
    } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

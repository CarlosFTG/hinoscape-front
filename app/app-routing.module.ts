import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from './adminboard/admin-board/admin-board.component';
import { MainComponent } from './components/main/main.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { HomePage } from './home/home.page';
import { AuthGuard } from './modules/auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
const routes: Routes = [
  {path:'home', component:HomePage,
  children: [
    {
      path: 'welcome', component: WelcomeComponent,
    },
    { path: 'gameboard', component: GameboardComponent,canActivate: [AuthGuard] },
    { path: 'adminBoard', component: AdminBoardComponent,canActivate: [AuthGuard] }
  ]
},
  { path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
    } 
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

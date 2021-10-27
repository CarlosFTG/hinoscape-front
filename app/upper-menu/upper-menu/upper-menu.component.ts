import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../../modules/auth/components/login/login.component';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../../modules/auth/components/register/register.component';

@Component({
  selector: 'app-upper-menu',
  templateUrl: './upper-menu.component.html',
  styleUrls: ['./upper-menu.component.scss'],
})
export class UpperMenuComponent implements OnInit {

  token=null;

  constructor(public modalController: ModalController, private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.authService.token$.subscribe(token => {
      this.token  = token;
    });
  }

  async openLoginModal(){
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async openRegisterModal(){
    const modal = await this.modalController.create({
      component: RegisterComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  logOut(){
    localStorage.removeItem('JWT_TOKEN');
    this.token=null;
    this.router.navigate(['/home/welcome']);
  }

  navToAdmin(){
    this.router.navigate(['/home/adminBoard']);
  }

}

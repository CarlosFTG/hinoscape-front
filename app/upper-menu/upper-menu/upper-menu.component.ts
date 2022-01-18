import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoginComponent } from '../../modules/auth/components/login/login.component';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../../modules/auth/components/register/register.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-upper-menu',
  templateUrl: './upper-menu.component.html',
  styleUrls: ['./upper-menu.component.scss'],
})
export class UpperMenuComponent implements OnInit {

  token=null;
  admin:boolean = false;

  constructor(public modalController: ModalController, private authService: AuthService,private router: Router,private menu: MenuController) { }

  ngOnInit() {
    this.authService.token$.subscribe(token => {
      if(token != null){
        let atobToken = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin(atobToken);
        this.token  = token;
      }
      
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


  async openMenuModal(){
    const modal = await this.modalController.create({
      component: MenuComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'admin': this.admin
      }
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

  isAdmin(token){
    if(token.authorities.includes('ROLE_ADMIN')){
      this.admin=true;
    }
  }

}

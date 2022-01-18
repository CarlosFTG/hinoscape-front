import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() admin: boolean;
  navigate : any;

  constructor(private modalController: ModalController,private router: Router) { }

  ngOnInit() {
  }

  watchUsers(){
    this.router.navigate(['/home/usersDetail']);
    this.modalController.dismiss();
  }

  watchCities(){
    this.router.navigate(['/home/cities']);
    this.modalController.dismiss();
  }


}

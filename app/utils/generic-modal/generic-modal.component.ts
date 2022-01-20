import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
export class GenericModalComponent implements OnInit {

  //@Input() text: String;
  @Input() action: number;

  constructor(private router: Router,private modalController: ModalController) { }

  ngOnInit() {
  }

  confirm(){
    //TODO: Acción en función de pantalla
    this.router.navigate(['/cities/map']);
    this.modalController.dismiss();
    /* alert(this.action)
    switch ( this.action ) {
      case 1:
        alert('hola')
        this.router.navigate(['/home/cities/map']);
          break;
      case 2:
          // statement 2
          break;
      case 3:
          // statement N
          break;
      default: 
          // 
          break;
   } */
  }

}

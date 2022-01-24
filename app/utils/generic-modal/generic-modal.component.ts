import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
export class GenericModalComponent implements OnInit {

  @Input() params: object;

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  confirm() {
    //TODO: Accion a realizar proviene del ts que abre el modal
      this.router.navigate(['home/cityDetail']);
      this.modalController.dismiss();
  }
}

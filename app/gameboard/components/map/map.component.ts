import { Component, OnInit } from '@angular/core';

import { GameboardServicesService } from '../../services/gameboard-services.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  constructor(private gameboardServices: GameboardServicesService) { }

  ngOnInit() {
    this.gameboardServices.getUserPosition();
    this.gameboardServices.renderMap();
  }

}

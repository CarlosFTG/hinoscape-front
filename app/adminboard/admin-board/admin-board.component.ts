import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToGame(){
    this.router.navigate(['main/gameboard']);
  }

}

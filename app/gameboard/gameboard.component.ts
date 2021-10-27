import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/auth/services/auth.service';
import { GameboardServicesService } from './services/gameboard-services.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {

  constructor(private authService: AuthService, private gameBoardService:GameboardServicesService) { }

  ngOnInit() {
    
    this.authService.userDetails$.subscribe(userDetails =>{
      if(userDetails !=null){
        this.getUserPoints(userDetails);
      }
    })
  }

  getUserPoints(userDetails){
    let userId=userDetails.id;
    let userChallenges =this.gameBoardService.getUserChallenges(userId).subscribe(
      res=>{
        this.gameBoardService.createChallenges(res);
      }
    );
    
  }
}

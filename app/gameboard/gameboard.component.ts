import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/auth/services/auth.service';
import { GameboardServicesService } from './services/gameboard-services.service';
import * as jwt_decode from "jwt-decode";
import { Challenge } from '../models/challenge.model';

import { ModalController } from '@ionic/angular';
import { MainComponent } from '../modules/challenge-presentation/components/main/main.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {

  currentChallenge;

  constructor(private authService: AuthService, private gameBoardService:GameboardServicesService,public modalController: ModalController) { }

  ngOnInit() {
    
    this.authService.userDetails$.subscribe(userDetails =>{
      if(userDetails !=null){
        this.getUserChallenges(userDetails);
      }
    })
  }

  getUserChallenges(userDetails){
    let userId=userDetails.id;
    let userChallenges =this.gameBoardService.getUserChallenges(userId).subscribe(
      res=>{
        console.log(res)
        this.findCurrentChallenge(res)
        this.gameBoardService.createChallenges(res);
      }
    );
  }

  //encuentra el siguiente de los retos a resolver
  findCurrentChallenge(challenges:any){
    challenges.forEach(challenge => {
      if(!challenge.discovered){
        this.openChallengeModal();
      }
    });
  }

  async openChallengeModal(){
    const modal = await this.modalController.create({
      component: MainComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}

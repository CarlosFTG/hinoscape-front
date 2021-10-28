import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit {

  userName;
  points;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userDetails$.subscribe(userDetails =>{
      if(userDetails !=null){
        //@ts-ignore   
        this.userName=userDetails.username;
        //@ts-ignore   
        this.points=userDetails.points;
      }
    })
  }

}

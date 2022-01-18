import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {

  userName:String;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.token$.subscribe(token => {
      if(token != null){
        let atobToken = JSON.parse(atob(token.split('.')[1]));
        this.userName=atobToken.sub;
      }
      
    });
  }

}

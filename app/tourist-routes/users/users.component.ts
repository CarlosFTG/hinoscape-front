import { Component, OnInit } from '@angular/core';
import { TouristRoutesService } from '../services/tourist-routes.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  users: any[];
  filterTerm: string;
  itemClicked:boolean = false;
  cardUserFullName: string=null;
  cardUserEmail:string = null;
  cardUserEnabled: boolean = false;

  constructor(private touristRoutesService:TouristRoutesService) { 
  
  }


  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
   this.touristRoutesService.getUsers().subscribe(
     data=>{
      this.users=data;
      console.log(this.users)    
     }
   )
  }

  clickItem(userName,name,email,enabled){
    if(!this.itemClicked && this.cardUserEmail!=email){
      this.itemClicked=true;
      this.cardUserFullName= name + " "+ userName;
      this.cardUserEmail=email;
      this.cardUserEnabled=enabled;
    }else{
      this.itemClicked=false;
      this.cardUserFullName=null;
      this.cardUserEmail=null;
      this.cardUserEnabled=null;
    }
  }

}

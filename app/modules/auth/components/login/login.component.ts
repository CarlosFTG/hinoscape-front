import { Component, OnInit,Input  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  token=null;

  constructor(private authService: AuthService,private formBuilder: FormBuilder, public modalController: ModalController
    ) { 
      this.loginForm = this.formBuilder.group({
        username: ['prueba2'] ,
        password: ['12345'],
      });
    }

    ngOnInit(): void {
      this.authService.token$.subscribe(token => {
        if(token !=null){
            this.dismiss();
        }
      
      });
    }
  
  
  login(){
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }


}

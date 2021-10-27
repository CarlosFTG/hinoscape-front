import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  userRegisterForm: FormGroup;

  constructor(public modalController: ModalController,private authService:AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userRegisterForm = new FormGroup({
      'username': new FormControl(),
      'pwd': new FormControl(),
      'pwd2': new FormControl(),
    });
  }

  register(){
    //TODO: Control de nulos y contraseña igual
    let user = {
      'username': this.userRegisterForm.get('username').value,
      //@ts-ignore
      'password': this.userRegisterForm.get('pwd').value,
      'pwd2':this.userRegisterForm.get('pwd2').value
    }
    console.log(this.userRegisterForm.get('username').value)
    this.authService.registerUser(user)
  }

 /*  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  } */

}

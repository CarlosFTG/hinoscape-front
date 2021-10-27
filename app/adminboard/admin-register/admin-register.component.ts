import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../modules/auth/services/auth.service';
@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss'],
})
export class AdminRegisterComponent implements OnInit {

  adminRegisterForm: FormGroup;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.adminRegisterForm = new FormGroup({
      'username': new FormControl(),
      'pwd': new FormControl(),
      'pwd2': new FormControl(),
    });
  }

  register(){
    //TODO: Control de nulos y contraseña igual
    let user = {
      'username': this.adminRegisterForm.get('username').value,
      //@ts-ignore
      'password': this.adminRegisterForm.get('pwd').value,
      'pwd2':this.adminRegisterForm.get('pwd2').value
    }
    this.authService.registerAdmin(user);
  }

}

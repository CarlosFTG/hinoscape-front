import { Component, OnInit,Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;

  submitted = false;

  errorMsg;

  constructor(public formBuilder: FormBuilder,private fb: FormBuilder, private authService: AuthService,public modalController: ModalController,private router: Router) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: [''],
      surname1: [''],
      surname2: [''],
      username: [''],
      email: [''],
      password: [''],
    });
  }

  register() {
    this.submitted = true;
    
      this.authService.registerUser(this.credentials.value).subscribe(
        data=>{
          if(data.errorMsg != null){
            console.log(data.errorMsg)
            this.errorMsg=data.errorMsg;
          }else{
              this.modalController.dismiss();
              this.router.navigate(['home/registered'])
          }

        }
      )
      
  }

}

import { Component, OnInit,Input  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;

  submitted = false;

  constructor(public formBuilder: FormBuilder,private fb: FormBuilder, private authService: AuthService,private router: Router,public modalController: ModalController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.submitted = true;
    
      this.authService.login(this.credentials.value).subscribe(
        res => {
          //@ts-ignore    
          localStorage.setItem('JWT_TOKEN',res.token );
          //@ts-ignore  
          this.authService.sendToken(res.token);
          //@ts-ignore  
          //this.getUserDetails(atob(res.token.split('.')[1]))
          this.modalController.dismiss();
          this.router.navigate(['home/intro']);
        }, 
        err => {
          console.log(err)
        }
      );
    
  }

}

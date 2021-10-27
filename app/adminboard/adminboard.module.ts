import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [AdminRegisterComponent,AdminBoardComponent],
  imports: [
    ReactiveFormsModule
  ],
  exports:[AdminRegisterComponent,AdminBoardComponent,IonicModule]
})
export class AdminboardModule { }

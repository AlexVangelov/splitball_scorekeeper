import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';

import { NineBallRoutingModule } from './nine-ball-routing.module';
import { NineBallComponent } from './nine-ball.component';

@NgModule({
  declarations: [
    NineBallComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NineBallRoutingModule
  ]
})
export class NineBallModule { }

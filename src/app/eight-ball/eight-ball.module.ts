import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';

import { EightBallRoutingModule } from './eight-ball-routing.module';
import { EightBallComponent } from './eight-ball.component';

@NgModule({
  declarations: [
    EightBallComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    EightBallRoutingModule
  ]
})
export class EightBallModule { }

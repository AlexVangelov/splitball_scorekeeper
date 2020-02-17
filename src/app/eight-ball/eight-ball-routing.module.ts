import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EightBallComponent } from './eight-ball.component';

const routes: Routes = [
  { path: '', component: EightBallComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EightBallRoutingModule { }

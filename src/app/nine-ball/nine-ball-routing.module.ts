import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NineBallComponent } from './nine-ball.component';

const routes: Routes = [
  { path: '', component: NineBallComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NineBallRoutingModule { }

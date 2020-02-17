import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '8ball',
    loadChildren: () => import('./eight-ball/eight-ball.module').then(m => m.EightBallModule)
  },
  {
    path: '9ball',
    loadChildren: () => import('./nine-ball/nine-ball.module').then(m => m.NineBallModule)
  },
  { path: '',
    redirectTo: '/9ball',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

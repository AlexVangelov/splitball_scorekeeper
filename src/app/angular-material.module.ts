import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatTabsModule, MatSliderModule,
    MatToolbarModule, MatSnackBarModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatTabsModule, MatSliderModule,
    MatToolbarModule, MatSnackBarModule
  ]
})

export class AngularMaterialModule {
}
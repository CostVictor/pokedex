import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';



@NgModule({
  declarations: [
    CardInfoComponent
  ],
  exports: [CardInfoComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

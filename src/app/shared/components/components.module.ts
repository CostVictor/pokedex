import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';
import { ContainerComponent } from './container/container.component';



@NgModule({
  declarations: [
    CardInfoComponent,
    ContainerComponent
  ],
  exports: [CardInfoComponent, ContainerComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

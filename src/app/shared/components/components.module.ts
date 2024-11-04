import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';
import { ContainerComponent } from './container/container.component';
import { CheckboxComponent } from './checkbox/checkbox.component';



@NgModule({
  declarations: [
    CardInfoComponent,
    ContainerComponent,
    CheckboxComponent
  ],
  exports: [
    CardInfoComponent,
    ContainerComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

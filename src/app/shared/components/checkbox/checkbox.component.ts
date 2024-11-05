import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() active = false
  @Output() statusChange = new EventEmitter<boolean>()

  toggleCheckbox() {
    this.active = !this.active
    this.statusChange.emit(this.active)
  }
}

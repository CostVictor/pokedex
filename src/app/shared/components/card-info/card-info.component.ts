import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {
  @Input() namePokemon: string = "Não definido"
  @Input() description: string = "Não definido"
  @Input() listOfPokemonTypes: string[] = ["Não definido"]
  @Input() posNumber: Number = 0
  @Input() imageURL: string = ""

  constructor(private _router: Router) { }

  formattedPosNumber() {
    // deixa no formato `#000`.
    return `#${this.posNumber.toString().padStart(3, "0")}`
  }

  redirectToDatails() {
    this._router.navigate([`details/${this.namePokemon}`])
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { positionFormatter } from 'src/app/utils/formatters';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {
  @Input() namePokemon: string = "Não definido"
  @Input() description: string = "Não definido"
  @Input() listOfPokemonTypes = ["Não definido"]
  @Input() posNumber = 0
  @Input() imageURL = ""
  @Input() inFocus = false

  constructor(private _router: Router) { }

  formattedPosNumber() {
    return positionFormatter(this.posNumber)
  }

  redirectToDatails() {
    this._router.navigate([`details/${this.namePokemon}`])
  }
}

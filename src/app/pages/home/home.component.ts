import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonsService } from 'src/app/shared/services/pokemons.service';
import { PokemonDataProps } from 'src/app/shared/models/pokemon.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _pokemonsService: PokemonsService) { }
  allPokemons: PokemonDataProps[] = []
  subscription: Subscription | null = null

  ngOnInit() {
    this.subscription = this._pokemonsService.pokemons$
      .subscribe({ next: (values) => this.allPokemons = values })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

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
  filteredPokemons: PokemonDataProps[] = []

  textInput = ""
  searchInFocus = false
  subscriptions: Subscription[] = []

  getPosPokemon(name: string) {
    return this.allPokemons.findIndex(item => item.name === name) + 1
  }

  filter() {
    if (this.textInput) {
      this.filteredPokemons = this.allPokemons
        .filter(pokemon => pokemon.name.toLowerCase().includes(this.textInput.toLowerCase()))
    } else {
      this.filteredPokemons = []
    }
  }

  isFiltered(name: string) {
    return this.filteredPokemons.some(item => item.name === name)
  }

  ngOnInit() {
    this.subscriptions.push(this._pokemonsService.pokemons$
      .subscribe({ next: (values) => this.allPokemons = values }))
  }

  ngOnDestroy() {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe())
    }
  }
}
